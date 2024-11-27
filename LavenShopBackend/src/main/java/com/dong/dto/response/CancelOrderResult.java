package com.dong.dto.response;

import lombok.Data;

@Data
public class CancelOrderResult {
    String message;
    boolean isSuccess;
}