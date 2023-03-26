package com.playful.chat.controller.response;

import com.playful.chat.model.Room;
import com.playful.chat.model.UserModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class MessageResponse {

    private Long id;

    private String text;

    private LocalDateTime sendAt;

    private RoomResponse room;

    private UserResponse sender;

}
