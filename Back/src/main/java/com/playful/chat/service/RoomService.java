package com.playful.chat.service;

import com.playful.chat.controller.response.RoomResponse;
import com.playful.chat.mapper.RoomMapper;
import com.playful.chat.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<RoomResponse> list() {
        return roomRepository.findAll().stream().map(RoomMapper::toResponse).collect(Collectors.toList());
    }
}