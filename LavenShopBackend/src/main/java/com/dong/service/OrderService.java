package com.dong.service;

import com.dong.dto.model.OrderDto;
import com.dong.dto.response.CancelOrderResult;
import com.dong.dto.response.CreateOrderResultDto;
import com.dong.dto.response.ListOrderDto;
import com.dong.dto.response.OrderBasicInfoDto;

public interface OrderService {
    CreateOrderResultDto createOrder(long userId, OrderBasicInfoDto orderBasicInfoDto);
    CreateOrderResultDto capturePaypalOrder(long orderId);
    CancelOrderResult cancelCapturePaypal(long orderId);
    ListOrderDto getAllOrder(int pageNo, int pageSize, String sortBy, String sortDir);
    OrderDto getOrderById(long id);
    OrderDto updateOrder(OrderDto orderDto, long id);
    String cancelOrderById(long id);

}
