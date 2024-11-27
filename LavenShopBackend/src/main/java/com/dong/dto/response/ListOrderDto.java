package com.dong.dto.response;

import com.dong.dto.model.OrderDto;
import lombok.Data;

import java.util.List;

@Data
public class ListOrderDto {
    private List<OrderDto> orderList;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
