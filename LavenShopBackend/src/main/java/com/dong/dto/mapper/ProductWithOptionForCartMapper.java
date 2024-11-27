package com.dong.dto.mapper;

import com.dong.dto.response.ProductWithOptionForCartDto;
import com.dong.entity.Product;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductWithOptionForCartMapper {

    private final ModelMapper mapper;
    public ProductWithOptionForCartDto mapToProductOptionDto(Product product){
        ProductWithOptionForCartDto productWithOptionDto = mapper.map(product, ProductWithOptionForCartDto.class);
        return productWithOptionDto;
    }
}
