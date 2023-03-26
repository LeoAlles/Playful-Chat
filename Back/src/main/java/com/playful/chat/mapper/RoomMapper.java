package com.playful.chat.mapper;

import com.playful.chat.controller.request.CreateRoomRequest;
import com.playful.chat.controller.response.RoomResponse;
import com.playful.chat.model.Room;

public class RoomMapper {
    public static RoomResponse toResponse(Room room) {
        return RoomResponse.builder()
                .name(room.getName())
                .creator(UserMapper.toResponse(room.getCreator()))
                .dateCreated(room.getDateCreated().toString())
                .build();
    }

    public static Room toEntity(CreateRoomRequest createRoomRequest) {
        return Room.builder()
                .name(createRoomRequest.getName())
                .totalUsers(createRoomRequest.getTotalUsers())
                .build();
    }
}