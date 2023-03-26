package com.playful.chat.controller.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateMessageRequest {


    private String text;

    private Long senderId;

    private Long roomId;

}
