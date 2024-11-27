package com.dong.dto.response;

import com.dong.dto.model.ProductOptionDto;
import lombok.Data;

import java.util.List;
@Data

public class ProductInOrderDto {
    private Long id;
    private String name;
    private double price;
    private double discountRate;
    private String thumbnailUrl;
    private ProductOptionDto option;
    private int quantity;
}
