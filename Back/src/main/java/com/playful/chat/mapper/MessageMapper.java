package com.playful.chat.mapper;

import com.playful.chat.controller.response.MessageResponse;
import com.playful.chat.model.Message;
import com.playful.chat.service.MessageService;

public class MessageMapper {
    public static MessageResponse toResponse(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .text(message.getText())
                .sendAt(message.getSendAt())
                .sender(UserMapper.toResponse(message.getSender()))
                .room(RoomMapper.toResponse(message.getRoom()))
                .build();
    }
}
