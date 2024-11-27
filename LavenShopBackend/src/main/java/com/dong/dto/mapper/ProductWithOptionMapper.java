package com.dong.dto.mapper;


import com.dong.dto.response.ProductWithOptionDto;
import com.dong.entity.Product;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductWithOptionMapper {

    private final ModelMapper mapper;
    public ProductWithOptionDto mapToProductOptionDto(Product product){
        ProductWithOptionDto productWithOptionDto = mapper.map(product, ProductWithOptionDto.class);
        return productWithOptionDto;
    }
}
