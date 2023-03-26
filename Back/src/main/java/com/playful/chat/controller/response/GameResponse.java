package com.playful.chat.controller.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameResponse {

    private Long id;

    private UserResponse creator;

    private CouponResponse coupon;

    private String question;

    private String answer;


}
