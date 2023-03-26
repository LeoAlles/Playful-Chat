package com.playful.chat.service;

import com.playful.chat.controller.request.CreateMessageRequest;
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

import javax.transaction.Transactional;
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
    private CouponService couponService;

    @Autowired
    private FindUserService findUserService;

    @Autowired
    private FindCouponService findCouponService;

    @Autowired
    private FindGameService findGameService;


    public Long create(CreateGameRequest createGameRequest) {

        Game game = GameMapper.toEntity(createGameRequest);

        UserModel creator = findUserService.findById(createGameRequest.getCreatorId());
        Coupon coupon = findCouponService.findById(createGameRequest.getCouponId());

        game.setCreator(creator);
        game.setCoupon(coupon);

        gameRepository.save(game);

        return game.getId();
    }


    @Transactional
    public boolean checkAnswer(CreateMessageRequest createMessageRequest) {

        createMessageRequest.setText(createMessageRequest.getText().replaceAll(" ", ""));

        List<Game> games = findGameService.findAllByRoomId(createMessageRequest.getRoomId());

        try{

            Game game = games.stream().filter(game1 -> game1.isActive()).collect(Collectors.toList()).get(0);

            if(Objects.equals(createMessageRequest.getSenderId(), game.getCreator().getId())) {
                return false;
            }

            if(!game.isActive()) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Jogo não ativo");
            }

            if(!Objects.equals(game.getAnswer().toLowerCase(), createMessageRequest.getText().toLowerCase())) {
                return false;
            }

            UserModel winner = findUserService.findById(createMessageRequest.getSenderId());

            game.setWinner(winner);
            game.setActive(false);

            gameRepository.save(game);

            couponService.deliver(game.getCoupon().getId(), createMessageRequest.getSenderId());


        }catch (Exception e) {
            return false;
        }



        return true;

    }


    public List<GameResponse> list() {
        return gameRepository.findAll().stream().map(GameMapper::toResponse).collect(Collectors.toList());
    }

    public List<GameResponse> listByRoom(Long roomId) {
        return gameRepository.findAllByRoomId(roomId).stream().map(GameMapper::toResponse).collect(Collectors.toList());
    }
}
