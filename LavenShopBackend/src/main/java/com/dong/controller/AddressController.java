package com.dong.controller;


import com.dong.dto.model.AddressDto;
import com.dong.service.AddressService;
import com.dong.utils.CustomHeaders;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
@AllArgsConstructor
public class AddressController {
    AddressService addressService;

    @GetMapping("/create")
    public ResponseEntity<AddressDto> createAddress(@RequestHeader(CustomHeaders.X_AUTH_USER_ID) long userId,
                                                    @RequestBody AddressDto addressDto){
        return new ResponseEntity<>(addressService.createAddress(userId, addressDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AddressDto>> getAllAddressByUserId(@RequestHeader(CustomHeaders.X_AUTH_USER_ID) long userId){
        return new ResponseEntity<>(addressService.getAddressByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressDto> getAddressById(@PathVariable(name = "id") long id) {
        return new ResponseEntity<>(addressService.getAddressById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressDto> updateAddress(@RequestHeader(CustomHeaders.X_AUTH_USER_ID) long userId,
                                                    @PathVariable(name = "id") long id,
                                                    @RequestBody AddressDto addressDto) {
        return new ResponseEntity<>(addressService.updateAddress(userId, addressDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable(name = "id") long id) {
        addressService.deleteAddress(id);
        return new ResponseEntity<>("Address deleted successfully", HttpStatus.OK);
    }

}
