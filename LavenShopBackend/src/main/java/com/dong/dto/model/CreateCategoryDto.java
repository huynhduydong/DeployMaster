package com.dong.dto.model;
import lombok.Data;


@Data
public class CreateCategoryDto {
    private String name;
    private String thumbnailUrl;
    private Long parentId;
    private boolean isPrimary;
}
