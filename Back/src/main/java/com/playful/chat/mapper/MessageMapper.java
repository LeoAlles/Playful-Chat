package com.playful.chat.mapper;

import com.playful.chat.controller.request.CreateMessageRequest;
import com.playful.chat.controller.response.MessageResponse;
import com.playful.chat.model.Message;
import com.playful.chat.service.MessageService;

public class MessageMapper {
    public static MessageResponse toResponse(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .text(message.getText())
                .timestamp(message.getSendAt().toString())
                .sender( message.getSender() == null ? null : UserMapper.toResponse(message.getSender()))
                .roomId(message.getRoom().getId())
                .build();
    }

    public static Message toEntity(CreateMessageRequest createMessageRequest) {
        return Message.builder()
                .text(createMessageRequest.getText())
                .build();
    }
}
