package com.playful.chat.service;

import com.playful.chat.controller.request.CreateMessageRequest;
import com.playful.chat.controller.response.MessageResponse;
import com.playful.chat.mapper.MessageMapper;
import com.playful.chat.model.Message;
import com.playful.chat.model.Room;
import com.playful.chat.model.UserModel;
import com.playful.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private FindUserService findUserService;

    @Autowired
    private FindRoomService findRoomService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public List<MessageResponse> findAllByRoomId(Long roomId) {
        return messageRepository.findAllByRoomId(roomId).stream().map(MessageMapper::toResponse).collect(toList());
    }

    @Transactional
    public void create(CreateMessageRequest createMessageRequest) {

        Room room = findRoomService.findById(createMessageRequest.getRoomId());
        UserModel sender = findUserService.findById(createMessageRequest.getSenderId());

        Message message = MessageMapper.toEntity(createMessageRequest);

        message.setRoom(room);
        message.setSender(sender);
        message.setSendAt(LocalDateTime.now());

        messageRepository.save(message);
        sendMessage(message);

    }

    private void sendMessage(Message message) {
        simpMessagingTemplate.convertAndSend("/topic/" + message.getRoom().getId(), MessageMapper.toResponse(message));
    }

}
