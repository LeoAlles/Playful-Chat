package com.playful.chat.controller;

import com.playful.chat.controller.request.CreateRoomRequest;
import com.playful.chat.controller.response.RoomResponse;
import com.playful.chat.model.Room;
import com.playful.chat.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/search")
    public List<RoomResponse> listRooms() {
        return roomService.list();
    }

    @PostMapping("/create")
    public RoomResponse create(@Valid @RequestBody CreateRoomRequest createRoomRequest) {
        return roomService.create(createRoomRequest);
    }

    @GetMapping("/detail/{roomId}")
    public RoomResponse detail(@PathVariable Long roomId ) {
        return roomService.detail(roomId);
    }

    @DeleteMapping("/delete/{roomId}")
    public void delete(@PathVariable Long roomId) {
        roomService.delete(roomId);
    }



}