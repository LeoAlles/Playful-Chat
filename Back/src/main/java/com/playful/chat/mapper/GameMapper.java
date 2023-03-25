package com.playful.chat.mapper;

import com.playful.chat.controller.request.GameRequest;
import com.playful.chat.model.Game;

public class GameMapper {
    public static Game toEntity(GameRequest gameRequest) {
        return Game.builder()
                .answer(gameRequest.getAnswer())
                .question(gameRequest.getQuestion())
                .build();
    }
}
