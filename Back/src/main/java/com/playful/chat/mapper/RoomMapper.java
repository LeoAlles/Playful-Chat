package com.playful.chat.mapper;

import com.playful.chat.controller.response.RoomResponse;
import com.playful.chat.model.Room;

public class RoomMapper {
    public static RoomResponse toResponse(Room room) {
        return RoomResponse.builder()
                .name(room.getName())
                .creator(room.getCreator())
                .totalUsers(room.getTotalUsers())
                .dateCreated(room.getDateCreated())
                .build();
    }
}