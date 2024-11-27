package com.dong.service;

import com.dong.dto.message.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
}
