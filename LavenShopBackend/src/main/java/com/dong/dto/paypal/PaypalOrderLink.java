package com.dong.dto.paypal;

import lombok.Data;

@Data
public class PaypalOrderLink {
    public String href;
    public String rel;
    public String method;
}