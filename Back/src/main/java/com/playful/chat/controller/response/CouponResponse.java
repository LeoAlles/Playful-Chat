package com.playful.chat.controller.response;


import com.playful.chat.model.UserModel;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponResponse {

    private Long id;

    private String code;

    private UserResponse creator;

    private UserResponse owner;

    private String store;

}
