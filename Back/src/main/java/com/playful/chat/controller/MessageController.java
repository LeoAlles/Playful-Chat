package com.playful.chat.controller;


import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/greetings")
    public String greeting(@DestinationVariable String roomId, String message) throws Exception {
        System.out.println(roomId);
        return message;
    }

}
