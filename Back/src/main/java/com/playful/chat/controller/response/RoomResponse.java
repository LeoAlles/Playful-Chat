package com.playful.chat.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class RoomResponse {

    private String name;

    private String creator;

    private int totalUsers;

    private LocalDateTime dateCreated;

}