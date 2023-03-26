package com.playful.chat.mapper;

import com.playful.chat.controller.request.CreateGameRequest;
import com.playful.chat.model.Game;

public class GameMapper {
    public static Game toEntity(CreateGameRequest createGameRequest) {
        return Game.builder()
                .answer(createGameRequest.getAnswer())
                .question(createGameRequest.getQuestion())
                .build();
    }
}
