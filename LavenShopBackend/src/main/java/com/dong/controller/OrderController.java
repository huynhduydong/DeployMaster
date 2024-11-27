package com.dong.controller;
import com.dong.dto.model.OrderDto;
import com.dong.dto.response.CancelOrderResult;
import com.dong.dto.response.CreateOrderResultDto;
import com.dong.dto.response.ListOrderDto;
import com.dong.dto.response.OrderBasicInfoDto;
import com.dong.service.OrderService;
import com.dong.utils.AppConstants;
import com.dong.utils.CustomHeaders;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
@AllArgsConstructor
@CrossOrigin
public class OrderController {
    private OrderService orderService;


    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @PostMapping
    public ResponseEntity<CreateOrderResultDto> createOrder(@RequestHeader(CustomHeaders.X_AUTH_USER_ID) long userId,
                                                            @RequestBody OrderBasicInfoDto orderBasicInfoDto) {
        logger.info("Example log from {}", OrderController.class.getSimpleName());
        return new ResponseEntity<>(orderService.createOrder(userId, orderBasicInfoDto), HttpStatus.OK);
    }

    @PostMapping("/paypal_capture/{orderId}")
    public ResponseEntity<CreateOrderResultDto> capturePaypalOrder(@PathVariable long orderId) {
        return new ResponseEntity<>(orderService.capturePaypalOrder(orderId), HttpStatus.OK);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable long orderId, @RequestBody OrderDto orderDto){
        return new ResponseEntity<>(orderService.updateOrder(orderDto, orderId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ListOrderDto> getAllOrder(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ){
        return new ResponseEntity<>(orderService.getAllOrder(pageNo, pageSize, sortBy, sortDir), HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable long orderId){
        return new ResponseEntity<>(orderService.getOrderById(orderId), HttpStatus.OK);
    }


    @DeleteMapping("/paypal_capture/{orderId}")
    public ResponseEntity<CancelOrderResult> deleteCapturePaypalOrder(@PathVariable long orderId) {
        return new ResponseEntity<>(orderService.cancelCapturePaypal(orderId), HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable long orderId) {
        return new ResponseEntity<>(orderService.cancelOrderById(orderId), HttpStatus.OK);
    }




}
