package com.dong.dto.model;


import lombok.Data;

import java.util.Set;

@Data
public class ProductDto {

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

    private Set<ProductOptionDto> options;
    private Set<ProductSpecificationDto> specifications;
}
