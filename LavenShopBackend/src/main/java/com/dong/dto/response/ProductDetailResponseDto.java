package com.dong.dto.response;
import com.dong.dto.model.ProductOptionDto;
import com.dong.dto.model.ProductSpecificationDto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ProductDetailResponseDto {
    private Long id;


    private String name;


    private String brand;

    private String description;

    private double price;

    private double discountRate;
    private String thumbnailUrl;
    private int reviewCount;
    private double ratingAverage;
    private int quantitySold;
    private String productSlug;
    private String categoryUrl;
    private CategoryResponseDto category;

    private List<ProductOptionDto> options;
    private Set<ProductSpecificationDto> specifications;
}