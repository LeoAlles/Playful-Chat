package com.playful.chat.controller;

import com.playful.chat.controller.request.CreateGameRequest;
import com.playful.chat.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/games")
public class GameController {


    @Autowired
    private GameService gameService;


    @PostMapping
    public Long create(@Valid @RequestBody CreateGameRequest createGameRequest) {
        return gameService.create(createGameRequest);
    }



}
