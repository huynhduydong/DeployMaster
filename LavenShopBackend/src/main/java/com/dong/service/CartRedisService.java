package com.dong.service;

import com.dong.dto.model.ProductInCartDto;
import com.dong.dto.request.CartItemRequest;
import com.dong.dto.request.ProductCartDeletionRequest;
import com.dong.dto.request.UpdateCartRequest;

import java.util.List;


public interface CartRedisService extends BaseRedisService {
    void addProductToCart(String userId, CartItemRequest item);
    void updateProductInCart(String userId, UpdateCartRequest items);
    void deleteProductInCart(String userId, ProductCartDeletionRequest request);
    List<ProductInCartDto> getProductsFromCart(String userId);
    void deleteAllProductsInCart(String userId);
}
