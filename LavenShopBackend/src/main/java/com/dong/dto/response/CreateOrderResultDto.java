package com.dong.dto.response;

import com.dong.dto.model.OrderDto;
import lombok.Data;

@Data
public class CreateOrderResultDto {
    private String result;
    private String paypalLink;
    private OrderDto orderDto;
}
