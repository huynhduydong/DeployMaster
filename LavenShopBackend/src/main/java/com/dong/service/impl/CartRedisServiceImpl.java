package com.dong.service.impl;


import com.dong.dto.model.ProductInCartDto;
import com.dong.dto.request.CartItemRequest;
import com.dong.dto.request.ProductCartDeletionRequest;
import com.dong.dto.request.UpdateCartRequest;
import com.dong.dto.response.ProductWithOptionForCartDto;
import com.dong.exception.ResourceNotFoundException;
import com.dong.service.CartRedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class CartRedisServiceImpl extends BaseRedisServiceImpl implements CartRedisService {
    private final WebClient webClient;

    @Autowired
    public CartRedisServiceImpl(RedisTemplate<String, Object> redisTemplate, WebClient webClient){
        super(redisTemplate);
        this.webClient = webClient;
    }

    @Override
    public void addProductToCart(String userId, CartItemRequest item) {
        String key = "cart:user-" + userId;

        // Tao 1 stringbuilder de noi chuoi voi hieu nang tot hon la cong string
        StringBuilder fieldKeyBuilder;
        int updateQuantity;

        // Kiem tra xem product co option ko
        if(Objects.nonNull(item.getProductItemId())){

            fieldKeyBuilder = new StringBuilder("product_item:");

            // Bien boolean de chi ra phan tu dau tien, khong can them dau "," phia truoc
            // Ham for dung de ghep cac optionId lai thanh 1 chuoi co dang "5,10,12"
            boolean isFirst = true;
            for (Long optionId : item.getProductItemId()) {
                if (!isFirst) {
                    fieldKeyBuilder.append(",");
                } else {
                    isFirst = false;
                }
                fieldKeyBuilder.append(optionId);
            }

        } else {
            fieldKeyBuilder = new StringBuilder("product:");
            fieldKeyBuilder.append(item.getProductId());
        }

        // Ep kieu ve lai String de thao tac
        String fieldKey = fieldKeyBuilder.toString();

        if (this.hashExist(userId, fieldKey)) {
            updateQuantity = (Integer) this.hashGet(userId, fieldKey) + item.getQuantity();
        } else {
            updateQuantity = item.getQuantity();
        }

        this.hashSet(key, fieldKey, updateQuantity);
    }

    @Override
    public void updateProductInCart(String userId, UpdateCartRequest item) {
        String key = "cart:user-" + userId;
        String fieldKey;
        long delta = item.getDelta();
        fieldKey = Objects.nonNull(item.getProductItemId()) ?
                "product_item:" + item.getProductItemId() : "product:" + item.getProductId();

        this.hashSet(key, fieldKey, delta);
    }

    @Override
    public void deleteProductInCart(String userId, ProductCartDeletionRequest request) {
        if(Objects.nonNull(request.getProductItemId())){
            this.checkFieldKeyExist("cart:user-" + userId, "product_item:" + request.getProductItemId());
            this.delete("cart:user-" + userId, "product_item:" + request.getProductItemId());
        } else {
            this.checkFieldKeyExist("cart:user-" + userId, "product:" + request.getProductId());
            this.delete("cart:user-" + userId, "product:" + request.getProductId());

        }
    }
    public List<ProductInCartDto> getProductsFromCart(String userId) {
        String key = "cart:user-" + userId;
        Map<String, Object> products = this.getField(key);
        List<ProductInCartDto> productList = new ArrayList<>();

        for (Map.Entry<String, Object> entry : products.entrySet()) {
            boolean isProductItem = entry.getKey().startsWith("product_item");
            Object productObj = getProductById(entry.getKey().split(":")[1], isProductItem);

            ProductInCartDto productDto = null;
            if (productObj instanceof ProductWithOptionForCartDto) {
                ProductWithOptionForCartDto productWithOption = (ProductWithOptionForCartDto) productObj;
                productDto = new ProductInCartDto();

                // Ánh xạ đầy đủ các thuộc tính từ ProductWithOptionForCartDto sang ProductInCartDto
                productDto.setId(productWithOption.getId());
                productDto.setName(productWithOption.getName());
                productDto.setBrand(productWithOption.getBrand());
                productDto.setPrice(productWithOption.getPrice());
                productDto.setDiscountRate(productWithOption.getDiscountRate());
                productDto.setThumbnailUrl(productWithOption.getThumbnailUrl());
                if (productWithOption.getOption() != null && !productWithOption.getOption().isEmpty()) {
                    productDto.setOption(productWithOption.getOption().get(0));  // Lấy phần tử đầu tiên
                } else {
                    productDto.setOption(null);  // Nếu không có option
                }
            } else if (productObj instanceof ProductInCartDto) {
                productDto = (ProductInCartDto) productObj;
            }

            if (productDto != null) {
                int quantity = (int) this.hashGet(key, entry.getKey());
                productDto.setQuantity(quantity);
                productList.add(productDto);
            }
        }

        productList.sort(Comparator.comparing(ProductInCartDto::getId));
        return productList;
    }


    @Override
    public void deleteAllProductsInCart(String userId) {
        this.delete("cart:user-" + userId);
    }
    private Object getProductById(String id, boolean isProductItem) {
        if (isProductItem) {
            // Trường hợp là product_item, trả về ProductWithOptionForCartDto
            return this.webClient.post()
                    .uri("http://localhost:8080/api/v1/products/product-options")
                    .bodyValue(id)
                    .retrieve()
                    .bodyToMono(ProductWithOptionForCartDto.class)  // Trả về ProductWithOptionForCartDto
                    .block();
        } else {
            // Trường hợp là product, trả về ProductInCartDto
            return this.webClient.get()
                    .uri("http://localhost:8080/api/v1/products/" + id)
                    .retrieve()
                    .bodyToMono(ProductInCartDto.class)
                    .block();
        }
    }


    private void checkFieldKeyExist(String key, String keyField){
        if(!this.hashExist(key, keyField)){
            throw new ResourceNotFoundException(key, keyField, 0);
        }
    }
}