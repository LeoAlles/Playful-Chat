package com.playful.chat.controller;


import com.playful.chat.controller.request.CreateMessageRequest;
import com.playful.chat.controller.response.MessageResponse;
import com.playful.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void greeting(@Valid @RequestBody CreateMessageRequest createMessageRequest) throws Exception {
        messageService.create(createMessageRequest);
    }

    @GetMapping("/{roomId}")
    public List<MessageResponse> getByRoom(@PathVariable Long roomId) {
        return messageService.findAllByRoomId(roomId);
    }

}
