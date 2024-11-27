package com.dong.dto.mapper;

import com.dong.dto.model.UserDto;
import com.dong.entity.User;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserMapper {

    private ModelMapper mapper;

    public UserDto mapToDto(User user){
        UserDto userDto = mapper.map(user, UserDto.class);
        return userDto;
    }

    public User mapToEntity(UserDto userDto){
        User user = mapper.map(userDto, User.class);
        return user;
    }
}
