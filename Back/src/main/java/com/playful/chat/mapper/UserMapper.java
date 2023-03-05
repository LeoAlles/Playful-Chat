package com.playful.chat.mapper;


import com.playful.chat.controller.request.UserRequest;
import com.playful.chat.controller.response.UserResponse;
import com.playful.chat.model.UserModel;

public class UserMapper {

    public static UserModel toEntity(UserRequest request) {
        UserModel entity = new UserModel();
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        return entity;
    }

    public static UserResponse toResponse(UserModel entity) {
        UserResponse response = new UserResponse();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setEmail(entity.getEmail());
        return response;
    }
}
