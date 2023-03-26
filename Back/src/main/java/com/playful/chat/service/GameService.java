package com.playful.chat.service;

import com.playful.chat.controller.request.GameMessageRequest;
import com.playful.chat.controller.request.CreateGameRequest;
import com.playful.chat.controller.response.GameResponse;
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

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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


    public Long create(CreateGameRequest createGameRequest) {

        Game game = GameMapper.toEntity(createGameRequest);

        Room room = findRoomService.findById(createGameRequest.getRoomId());
        UserModel creator = findUserService.findById(createGameRequest.getCreatorId());
        Coupon coupon = findCouponService.findById(createGameRequest.getCouponId());

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

    public List<GameResponse> list() {
        return gameRepository.findAll().stream().map(GameMapper::toResponse).collect(Collectors.toList());
    }
}
