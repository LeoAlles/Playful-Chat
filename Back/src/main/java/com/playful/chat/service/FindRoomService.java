package com.playful.chat.service;

import com.playful.chat.model.Room;
import com.playful.chat.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FindRoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room findById(Long userId) {
        return roomRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sala não existe.")
        );
    }
}
