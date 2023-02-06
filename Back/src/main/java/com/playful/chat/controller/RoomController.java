package com.playful.chat.controller;

import com.playful.chat.controller.response.RoomResponse;
import com.playful.chat.model.Room;
import com.playful.chat.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/search")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<RoomResponse> listRooms() {
        return roomService.list();
    }


}
