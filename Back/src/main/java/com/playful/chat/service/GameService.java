package com.playful.chat.service;

import com.playful.chat.controller.request.GameMessageRequest;
import com.playful.chat.controller.request.GameRequest;
import com.playful.chat.mapper.GameMapper;
import com.playful.chat.model.Coupon;
import com.playful.chat.model.Game;
import com.playful.chat.model.Room;
import com.playful.chat.model.UserModel;
import com.playful.chat.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private FindRoomService findRoomService;

    @Autowired
    private FindUserService findUserService;

    @Autowired
    private FindCouponService findCouponService;


    public Long create(GameRequest gameRequest) {

        Game game = GameMapper.toEntity(gameRequest);

        Room room = findRoomService.findById(gameRequest.getRoomId());
        UserModel creator = findUserService.findById(gameRequest.getCreatorId());
        Coupon coupon = findCouponService.findById(gameRequest.getCouponId());

        game.setCreator(creator);
        game.setRoom(room);
        game.setCoupon(coupon);

        gameRepository.save(game);

        return game.getId();
    }


    public boolean checkAnswer(GameMessageRequest gameMessageRequest) {

        Game game = gameRepository.findById(gameMessageRequest.getGameId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Jogo não encontrado")
        );

        if(!game.isActive()) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Jogo não ativo");
        }

        if(!Objects.equals(game.getAnswer().toLowerCase(), gameMessageRequest.getAnswer().toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.CONTINUE, "Resposta errada");
        }

        UserModel winner = findUserService.findById(gameMessageRequest.getSenderId());

        game.setWinner(winner);
        game.setActive(false);

        gameRepository.save(game);

        return true;

    }

}
