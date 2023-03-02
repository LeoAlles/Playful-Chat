package com.playful.chat.mapper;


import com.playful.chat.controller.request.UsuarioRequest;
import com.playful.chat.controller.response.UsuarioResponse;
import com.playful.chat.model.User;

public class UsuarioMapper {

    public static User toEntity(UsuarioRequest request) {
        User entity = new User();
        entity.setNome(request.getNome());
        entity.setImagemPerfil(request.getImagemPerfil());
        entity.setNickname(request.getNickname());
        entity.setEmail(request.getEmail());
        return entity;
    }

    public static UsuarioResponse toResponse(User entity) {
        UsuarioResponse response = new UsuarioResponse();
        response.setId(entity.getId());
        response.setNome(entity.getNome());
        response.setEmail(entity.getEmail());
        return response;
    }
}
