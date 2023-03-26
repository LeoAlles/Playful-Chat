package com.playful.chat.controller.response;

import com.playful.chat.model.Message;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class RoomResponse {

    private Long id;

    private String name;

    private UserResponse creator;

    private String dateCreated;

}