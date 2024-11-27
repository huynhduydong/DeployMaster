package com.dong.service;


import com.dong.dto.model.CategoryDto;
import com.dong.dto.model.CreateCategoryDto;
import com.dong.dto.response.CategoryResponseDto;
import com.dong.dto.response.ObjectResponse;

import java.util.List;

public interface CategoryService {
    CategoryDto createCategory(CreateCategoryDto categoryDto);
    CategoryDto getCategoryById(Long id);
    ObjectResponse<CategoryResponseDto> getAllCategories(int pageNo, int pageSize, String sortBy, String sortDir);
    CategoryDto updateCategory(CreateCategoryDto categoryDto, Long id);
    void deleteCategory(Long id);
    ObjectResponse<CategoryResponseDto> searchCategory(String name, int pageNo, int pageSize, String sortBy, String sortDir);
}
