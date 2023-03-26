package com.playful.chat.controller.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameMessageRequest {


    private Long gameId;

    private String answer;

    private Long senderId;



}
