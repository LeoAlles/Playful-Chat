package com.playful.chat.controller.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRoomRequest {

    @NotBlank
    private String name;

    @NotNull
    private Long creatorId;

    @NotNull
    private int totalUsers;

}
