package com.playful.chat.controller;


import com.playful.chat.controller.response.MessageResponse;
import com.playful.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/messages")
public class MessageController {


    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/greetings")
    public String greeting(@DestinationVariable String roomId, String message) throws Exception {
        System.out.println(roomId);
        return message;
    }

    @GetMapping("/{roomId}")
    public List<MessageResponse> getByRoom(@PathVariable Long roomId) {
        return messageService.findAllByRoomId(roomId);
    }

}
