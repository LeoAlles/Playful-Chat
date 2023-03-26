package com.playful.chat.controller;

import com.playful.chat.controller.request.CreateGameRequest;
import com.playful.chat.controller.response.GameResponse;
import com.playful.chat.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {


    @Autowired
    private GameService gameService;


    @GetMapping
    public List<GameResponse> list() {
        return gameService.list();
    }

    @PostMapping
    public Long create(@Valid @RequestBody CreateGameRequest createGameRequest) {
        return gameService.create(createGameRequest);
    }


    @GetMapping("/room/{roomId}")
    public List<GameResponse> listByRoom(@PathVariable Long roomId) {
        return gameService.listByRoom(roomId);
    }


}
