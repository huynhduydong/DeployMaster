package com.dong.service.impl;


import com.dong.dto.mapper.UserMapper;
import com.dong.dto.model.UserDto;
import com.dong.dto.response.ObjectResponse;
import com.dong.entity.Role;
import com.dong.entity.User;
import com.dong.exception.LavenAPIException;
import com.dong.exception.ResourceNotFoundException;
import com.dong.repositories.RoleRepository;
import com.dong.repositories.UserRepository;
import com.dong.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;

    @Override
    public UserDto createUser(UserDto userDto) {

        // add check for username exists in database
        if(this.userRepository.existsByUsername(userDto.getUsername())){
            throw new LavenAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!");
        }

        // add check for email exists in database
        if(this.userRepository.existsByEmail(userDto.getEmail())){
            throw new LavenAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }

        User newUser = this.userMapper.mapToEntity(userDto);

        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role userRole = this.roleRepository.findByName("USER").get();
        roles.add(userRole);
        newUser.setRoles(roles);

        User userResponse = this.userRepository.save(newUser);
        return this.userMapper.mapToDto(userResponse);
    }

    @Override
    public ObjectResponse<UserDto> getAllUser(int pageSize, int pageNo, String sortBy, String sortDir) {
        // Tao 1 object Sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        // Tao Pageable de phan trang
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        // Tim tat ca cac trang
        Page<User> pages = this.userRepository.findAll(pageable);

        // Lay ra content cua cac trang
        List<User> users = pages.getContent();

        // Ep kieu sang UserDto
        List<UserDto> content = users.stream().map(user -> this.userMapper.mapToDto(user)).collect(Collectors.toList());

        ObjectResponse<UserDto> response = new ObjectResponse<>();
        response.setContent(content);
        response.setPageNo(pages.getNumber());
        response.setPageSize(pages.getSize());
        response.setTotalElements(pages.getTotalElements());
        response.setLast(pages.isLast());
        response.setTotalPages(pages.getTotalPages());
        return response;
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return this.userMapper.mapToDto(user);
    }

    @Override
    public UserDto getUserByUsername(String userName) {
        User user = this.userRepository.findByUsername(userName);
        return this.userMapper.mapToDto(user);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Long userId) {
        // add check for username exists in database
        if(this.userRepository.existsByUsername(userDto.getUsername())){
            throw new LavenAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!");
        }

        // add check for email exists in database
        if(this.userRepository.existsByEmail(userDto.getEmail())){
            throw new LavenAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }

        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        this.userRepository.save(user);

        return this.userMapper.mapToDto(user);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        this.userRepository.delete(user);
    }

    @Override
    public UserDto getUserProfile(Long userId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        return this.userMapper.mapToDto(user);
    }

    @Override
    public ObjectResponse<UserDto> searchUser(String name, int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // Tao 1 pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        // Tao 1 mang cac trang product su dung find all voi tham so la pageable
        Page<User> pages = this.userRepository.searchUserByName(name, pageable);

        // Lay ra gia tri (content) cua page
        List<User> users = pages.getContent();


        // Ep kieu sang dto
        List<UserDto> content = users.stream().map(user -> userMapper.mapToDto(user)).collect(Collectors.toList());

        // Gan gia tri (content) cua page vao ProductResponse de tra ve
        ObjectResponse<UserDto> response = new ObjectResponse();
        response.setContent(content);
        response.setTotalElements(pages.getTotalElements());
        response.setPageNo(pages.getNumber());
        response.setPageSize(pages.getSize());
        response.setLast(pages.isLast());
        response.setTotalPages(pages.getTotalPages());
        return response;
    }
}
