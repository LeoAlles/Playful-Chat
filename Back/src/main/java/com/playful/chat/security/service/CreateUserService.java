package com.playful.chat.security.service;


import com.playful.chat.controller.request.CreateUserRequest;
import com.playful.chat.controller.response.UserResponse;
import com.playful.chat.model.UserModel;
import com.playful.chat.repository.UserRepository;
import com.playful.chat.security.model.Authority;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import static com.playful.chat.mapper.UserMapper.toEntity;
import static com.playful.chat.mapper.UserMapper.toResponse;
import static com.playful.chat.security.model.RoleType.USER;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
public class CreateUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse create(CreateUserRequest request) {

        if(userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(BAD_REQUEST, "Esse email não está disponível.");
        }

        UserModel userModel = toEntity(request);

        userModel.setPassword(getEncryptedPassword(request.getPassword()));
        userModel.addAuthority(getDefaultAuthority());
        userModel.setActive(true);

        userRepository.save(userModel);

        return toResponse(userModel);
    }

    private String getEncryptedPassword(String unprotectedPassword) {
        return passwordEncoder.encode(unprotectedPassword);
    }

    private Authority getDefaultAuthority() {
        Authority authority = new Authority();
        authority.setRoleType(USER);
        return authority;
    }
}
