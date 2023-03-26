package com.playful.chat.service;

import com.playful.chat.model.Coupon;
import com.playful.chat.model.Message;
import com.playful.chat.repository.CouponRepository;
import com.playful.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FindMessageService {

    @Autowired
    private MessageRepository messageRepository;


    public List<Message> findAllByRoomId(Long roomId) {
        return messageRepository.findAllByRoomId(roomId);
    }
}
