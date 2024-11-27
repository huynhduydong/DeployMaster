package com.dong.service.impl;


import com.dong.dto.mapper.*;
import com.dong.dto.model.ProductDto;
import com.dong.dto.model.ProductOptionDto;
import com.dong.dto.response.*;
import com.dong.entity.Category;
import com.dong.entity.Product;
import com.dong.entity.ProductOption;
import com.dong.entity.ProductSpecification;
import com.dong.exception.ResourceNotFoundException;
import com.dong.repositories.CategoryRepository;
import com.dong.repositories.ProductOptionRepository;
import com.dong.repositories.ProductRepository;
import com.dong.repositories.ProductSpecificationRepository;
import com.dong.service.ProductService;
import com.dong.utils.SlugConvert;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    //Repositories
    private ProductRepository productRepository;
    private ProductOptionRepository optionRepository;
    private ProductSpecificationRepository specificationRepository;
    private CategoryRepository categoryRepository;

    //Mappers
    private ProductMapper productMapper;
    private OptionMapper optionMapper;
    private SpecificationMapper specificationMapper;
    private ProductWithOptionForCartMapper productWithOptionMapper;
    private CategoryMapper categoryMapper;
    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product newProduct = productMapper.mapToEntity(productDto);
        if(!newProduct.getCategoryUrl().equals("")){
            String categoryUrl = SlugConvert.convert(newProduct.getCategoryUrl());
            Category category = this.categoryRepository.findByUrlKey(categoryUrl);
            newProduct.setCategory(category);
        }
        String productSlug = SlugConvert.convert(productDto.getName());
        newProduct.setProductSlug(productSlug);
        Set<ProductOption> options = new HashSet<>(newProduct.getOptions());
        for(ProductOption option : options){
            newProduct.addOption(option);
        }
        Set<ProductSpecification> specifications = newProduct.getSpecifications();
        for(ProductSpecification specification : specifications){
            newProduct.addSpecification(specification);
        }

        Product productResponse = this.productRepository.save(newProduct);

        return productMapper.mapToDto(productResponse);
    }

    @Override
    public ObjectResponse<ProductDto> getAllProducts(int pageNo, int pageSize, String sortBy, String sortDir) {
        // Tao sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // Tao 1 pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        // Tao 1 mang cac trang product su dung find all voi tham so la pageable
        Page<Product> pages = this.productRepository.findAll(pageable);

        // Lay ra gia tri (content) cua page
        List<Product> products = pages.getContent();

        for(Product product : products){

        }

        // Ep kieu sang dto
        List<ProductDto> content = products.stream().map(product -> productMapper.mapToDto(product)).collect(Collectors.toList());

        // Gan gia tri (content) cua page vao ProductResponse de tra ve
        ObjectResponse<ProductDto> response = new ObjectResponse();
        response.setContent(content);
        response.setTotalElements(pages.getTotalElements());
        response.setPageNo(pages.getNumber());
        response.setPageSize(pages.getSize());
        response.setLast(pages.isLast());
        response.setTotalPages(pages.getTotalPages());
        return response;
    }

    @Override
    public ProductDetailResponseDto getProductById(Long id) {
        Product product = this.productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        Category category = this.categoryRepository.findByUrlKey(product.getCategoryUrl());
        CategoryResponseDto categoryResponseDto = this.categoryMapper.mapToResponseDto(category);

        ProductDetailResponseDto productDetailResponseDto = productMapper.mapToResponseDetailDto(product);
        productDetailResponseDto.setCategory(categoryResponseDto);
        return productDetailResponseDto;
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, Long productId) {
        Product product = this.productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        product.setName(productDto.getName());
        product.setBrand(productDto.getBrand());
        product.setDescription(productDto.getDescription());
        product.setDiscountRate(productDto.getDiscountRate());
        product.setPrice(productDto.getPrice());
        product.setQuantitySold(productDto.getQuantitySold());
        product.setReviewCount(productDto.getReviewCount());
        product.setRatingAverage(productDto.getRatingAverage());
        product.setThumbnailUrl(productDto.getThumbnailUrl());
        product.setCategoryUrl(productDto.getCategoryUrl());
        product.setProductSlug(SlugConvert.convert(product.getName()));

        // Xóa các options cũ
        product.setOptions(new HashSet<>());

        // Xử lý các options mới
        List<ProductOption> options = productDto.getOptions()
                .stream()
                .map(option -> {
                    // Sử dụng merge để chắc chắn rằng các đối tượng ProductOption nằm trong context
                    ProductOption managedOption = optionRepository.findById(option.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("ProductOption", "id", option.getId()));
                    managedOption.setName(option.getName());
                    managedOption.setValue(option.getValue());
                    return managedOption;
                })
                .collect(Collectors.toList());

        // Cập nhật các option vào product
        for (ProductOption option : options) {
            product.updateOption(option);
        }

        // Xử lý tương tự cho specifications
        Set<ProductSpecification> specifications = productDto.getSpecifications().stream()
                .map(specificationMapper::mapToEntity)
                .collect(Collectors.toSet());

        // Cập nhật specifications cho product
        product.setSpecifications(specifications);

        // Lưu product
        Product updatedProduct = productRepository.save(product);

        return productMapper.mapToDto(updatedProduct);
    }


    @Override
    public void deleteProduct(Long productId) {
        Product product = this.productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
        this.productRepository.delete(product);
    }

    @Override
    public ObjectResponse<ProductDto> searchProduct(String name, int pageNo, int pageSize, String sortBy, String sortDir){
        // Tao sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // Tao 1 pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        // Tao 1 mang cac trang product su dung find all voi tham so la pageable
        Page<Product> pages = this.productRepository.searchProductByName(name, pageable);

        // Lay ra gia tri (content) cua page
        List<Product> products = pages.getContent();


        // Ep kieu sang dto
        List<ProductDto> content = products.stream().map(product -> productMapper.mapToDto(product)).collect(Collectors.toList());

        // Gan gia tri (content) cua page vao ProductResponse de tra ve
        ObjectResponse<ProductDto> response = new ObjectResponse();
        response.setContent(content);
        response.setTotalElements(pages.getTotalElements());
        response.setPageNo(pages.getNumber());
        response.setPageSize(pages.getSize());
        response.setLast(pages.isLast());
        response.setTotalPages(pages.getTotalPages());

        return response;
    }

    @Override
    public ProductWithOptionForCartDto getProductByProductOptionId(String productOptionIds){

        String[] ids = productOptionIds.split(",");

        ProductOption firstOption = this.optionRepository.findById(Long.valueOf(ids[0]).longValue()).get();
        Product product = firstOption.getProduct();

        List<ProductOptionDto> optionDtoList = new ArrayList<>();

        for(String productOptionId : ids){
            ProductOptionDto option = optionMapper.mapToDto(this.optionRepository.findById(Long.valueOf(productOptionId).longValue()).get());
            optionDtoList.add(option);
        }

        ProductWithOptionForCartDto productWithOptionForCartDto;
        productWithOptionForCartDto = this.productWithOptionMapper.mapToProductOptionDto(product);
        productWithOptionForCartDto.setOption(optionDtoList);
        return productWithOptionForCartDto;
    }
}