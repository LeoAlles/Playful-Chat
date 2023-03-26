package com.playful.chat.mapper;

import com.playful.chat.controller.request.CreateGameRequest;
import com.playful.chat.controller.response.GameResponse;
import com.playful.chat.model.Game;

public class GameMapper {
    public static Game toEntity(CreateGameRequest createGameRequest) {
        return Game.builder()
                .answer(createGameRequest.getAnswer())
                .question(createGameRequest.getQuestion())
                .build();
    }

    public static GameResponse toResponse(Game game) {
        return GameResponse.builder()
                .id(game.getId())
                .question(game.getQuestion())
                .coupon(CouponMapper.toResponse(game.getCoupon()))
                .creator(UserMapper.toResponse(game.getCreator()))
                .answer(game.getAnswer())
                .build();
    }
}
