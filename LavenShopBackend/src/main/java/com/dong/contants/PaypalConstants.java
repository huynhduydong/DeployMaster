package com.dong.contants;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PaypalConstants {

    public static final String BASE_URI = "https://api-m.sandbox.paypal.com";

    public static String CLIENT_ID;
    public static String CLENT_SECRET;

    @Value("${PAYPAL_CLIENT_ID}")
    private String clientId;

    @Value("${PAYPAL_CLIENT_SECRET}")
    private String clientSecret;

    @PostConstruct
    public void init() {
        CLIENT_ID = clientId;
        CLENT_SECRET = clientSecret;
    }
}
