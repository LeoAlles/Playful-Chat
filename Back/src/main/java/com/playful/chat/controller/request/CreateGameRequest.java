package com.playful.chat.controller.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
public class CreateGameRequest {

    @NotNull
    private Long creatorId;

    @NotNull
    private Long couponId;

    @NotNull
    private Long roomId;

    @NotNull
    private String question;

    @NotNull
    private String answer;

}
