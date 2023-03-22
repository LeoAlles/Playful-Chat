package com.playful.chat.service;

import com.playful.chat.controller.request.CreateRoomRequest;
import com.playful.chat.controller.response.RoomResponse;
import com.playful.chat.mapper.RoomMapper;
import com.playful.chat.model.Room;
import com.playful.chat.model.UserModel;
import com.playful.chat.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private FindUserService findUserService;

    @Autowired
    private FindRoomService findRoomService;

    @Transactional
    public RoomResponse create(CreateRoomRequest createRoomRequest) {

        Room room = RoomMapper.toEntity(createRoomRequest);
        UserModel creator = findUserService.findById(createRoomRequest.getCreatorId());

        room.setCreator(creator);
        room.setDateCreated(LocalDateTime.now());

        roomRepository.save(room);

        return RoomMapper.toResponse(room);
    }

    public List<RoomResponse> list() {
        return roomRepository.findAll().stream().map(RoomMapper::toResponse).collect(Collectors.toList());
    }

    public void delete(Long roomId) {
        roomRepository.deleteById(roomId);
    }

    public RoomResponse detail(Long roomId) {
        Room room = findRoomService.findById(roomId);
        return RoomMapper.toResponse(room);
    }
}