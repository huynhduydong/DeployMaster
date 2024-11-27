package com.dong.dto.model;

import lombok.Data;
@Data

public class ProductInCartDto {
    private Long id;
    private String name;
    private String brand;
    private double price;
    private double discountRate;
    private String thumbnailUrl;
    private ProductOptionDto option;
    private int quantity;
}