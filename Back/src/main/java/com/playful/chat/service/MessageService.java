package com.playful.chat.service;

import com.playful.chat.controller.request.CreateMessageRequest;
import com.playful.chat.controller.response.MessageResponse;
import com.playful.chat.mapper.MessageMapper;
import com.playful.chat.model.Game;
import com.playful.chat.model.Message;
import com.playful.chat.model.Room;
import com.playful.chat.model.UserModel;
import com.playful.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class MessageService {

    private static final String CREATE_GAME = "!creategame ";

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private FindUserService findUserService;

    @Autowired
    private FindRoomService findRoomService;

    @Autowired
    private FindGameService findGameService;

    @Autowired
    private GameService gameService;

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

        Long gameId;

        if(checkIfIsGame(createMessageRequest)) {

            try {
                gameId = Long.parseLong(createMessageRequest.getText().substring(CREATE_GAME.length()));

                Game game = findGameService.findById(gameId);
                game.setRoom(room);
                game.setActive(true);
                message.setText("Pergunta: " + game.getQuestion());
                message.setSender(null);

            }catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Jogo inválido!");
            }


        }else {
            if(gameService.checkAnswer(createMessageRequest)){
                message.setText("Parabéns " + message.getSender().getName() + ", você ganhou!");
                message.setSender(null);
            }else{
                message.setSender(sender);
            };
        }

        message.setSendAt(LocalDateTime.now());

        messageRepository.save(message);
        sendMessage(message);

    }

    private boolean checkIfIsGame(CreateMessageRequest createMessageRequest) {
        return createMessageRequest.getText().contains("!creategame");
    }

    private void sendMessage(Message message) {
        simpMessagingTemplate.convertAndSend("/topic/" + message.getRoom().getId(), MessageMapper.toResponse(message));
    }

}
