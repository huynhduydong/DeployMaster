package com.dong.dto.response;

import lombok.Data;

@Data
public class CategoryResponseDto {
    private Long id;

    private String name;
    private String urlKey;
    private String thumbnailUrl;
    private Long parentId;
}
