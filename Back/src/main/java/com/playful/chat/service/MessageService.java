package com.playful.chat.service;

import com.playful.chat.controller.response.MessageResponse;
import com.playful.chat.mapper.MessageMapper;
import com.playful.chat.model.Message;
import com.playful.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;


    public void saveMessage(Message message) {
        messageRepository.save(message);
    }


    public List<MessageResponse> findAllByRoomId(Long roomId) {
        return messageRepository.findAllByRoomId(roomId).stream().map(MessageMapper::toResponse).collect(toList());
    }
}
