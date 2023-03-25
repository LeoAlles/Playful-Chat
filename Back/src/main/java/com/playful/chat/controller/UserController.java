package com.playful.chat.controller;


import com.playful.chat.controller.request.UserRequest;
import com.playful.chat.controller.response.UserResponse;
import com.playful.chat.security.service.AuthenticatedUserService;
import com.playful.chat.security.service.CreateUserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class UserController {

    @Autowired
    private CreateUserService createUserService;

    @PostMapping
    public UserResponse create(@RequestBody UserRequest request) {
        return createUserService.create(request);
    }

}
