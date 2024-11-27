package com.dong.service.impl;

import com.dong.dto.message.RegisterDto;
import com.dong.entity.Role;
import com.dong.entity.User;
import com.dong.exception.LavenAPIException;
import com.dong.repositories.RoleRepository;
import com.dong.repositories.UserRepository;
import com.dong.service.AuthService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public String register(RegisterDto registerDto) {

        // add check for username exists in database
        if(this.userRepository.existsByUsername(registerDto.getUsername())){
            throw new LavenAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!");
        }

        // add check for email exists in database
        if(this.userRepository.existsByEmail(registerDto.getEmail())){
            throw new LavenAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setPhone(registerDto.getPhone());
        user.setGender(registerDto.getGender());
        user.setDateOfBirth(registerDto.getDateOfBirth());

        Set<Role> roles = new HashSet<>();
        Role userRole = this.roleRepository.findByName("USER").get();
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        return "User register successfully!";
    }
}
