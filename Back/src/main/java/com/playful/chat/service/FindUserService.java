package com.playful.chat.service;

import com.playful.chat.model.UserModel;
import com.playful.chat.repository.CouponRepository;
import com.playful.chat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FindUserService {

    @Autowired
    private UserRepository userRepository;

    public UserModel findById(Long userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não existe.")
        );
    }
}
