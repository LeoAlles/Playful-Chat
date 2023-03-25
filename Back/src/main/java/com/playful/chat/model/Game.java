package com.playful.chat.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Game {

    @Id
    private Long id;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime sendAt = LocalDateTime.now();

    @OneToOne(cascade = CascadeType.ALL)
    private Coupon coupon;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private UserModel creator;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    @Column(nullable = false)
    private String answer;

    @ManyToOne
    @JoinColumn(name = "winner_id")
    @Builder.Default
    private UserModel winner = null;

}
