package com.dong.dto.mapper;

import com.dong.dto.model.AddressDto;
import com.dong.entity.Address;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AddressMapper {

    private ModelMapper mapper;

    public AddressDto mapToDto(Address address){
        AddressDto addressDto = mapper.map(address, AddressDto.class);
        return addressDto;
    }

    public Address mapToEntity(AddressDto addressDto){
        Address address = mapper.map(addressDto, Address.class);
        return address;
    }
}
