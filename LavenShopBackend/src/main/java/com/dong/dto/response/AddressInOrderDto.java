package com.dong.dto.response;

import com.dong.dto.model.OrderDto;
import lombok.Data;

import java.util.Set;
@Data

public class AddressInOrderDto {
    private long id;

    private String name;
    private String phone;
    private String company;
    private String province;
    private String district;
    private String ward;
    private String address;
    private String addressType;
    private boolean isDefault;

    private Set<OrderDto> orders;
}
