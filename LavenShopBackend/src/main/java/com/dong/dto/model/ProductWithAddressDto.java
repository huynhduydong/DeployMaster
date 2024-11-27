package com.dong.dto.model;

import lombok.Data;

@Data
public class ProductWithAddressDto {
    private Long id;
    private String name;
    private double price;
    private double discountRate;
    private String thumbnailUrl;
    private ProductOptionDto option;
}