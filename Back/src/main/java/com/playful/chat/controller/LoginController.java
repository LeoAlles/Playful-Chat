package com.playful.chat.controller;

import com.playful.chat.controller.response.UserResponse;
import com.playful.chat.security.service.AuthenticatedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @PostMapping
    public UserResponse login() {
        return authenticatedUserService.getResponse();
    }

}
