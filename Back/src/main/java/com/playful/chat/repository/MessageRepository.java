package com.playful.chat.repository;

import com.playful.chat.controller.response.MessageResponse;
import com.playful.chat.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByRoomId(Long roomId);
}
