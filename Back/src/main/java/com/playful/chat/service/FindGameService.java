package com.playful.chat.service;

import com.playful.chat.model.Game;
import com.playful.chat.model.Room;
import com.playful.chat.repository.GameRepository;
import com.playful.chat.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FindGameService {

    @Autowired
    private GameRepository gameRepository;

    public Game findById(Long gameId) {
        return gameRepository.findById(gameId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não existe.")
        );
    }

    public List<Game> findAllByRoomId(Long roomId) {

        return gameRepository.findAllByRoomId(roomId);
    }
}
