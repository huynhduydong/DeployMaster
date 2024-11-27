package com.dong.dto.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;

    private String name;


    private String email;

    private String username;

    private String password;
    private String phone;

    private String gender;
    private Date dateOfBirth;
}