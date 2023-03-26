package com.playful.chat.repository;

import com.playful.chat.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {

    Optional<Game> findByRoomId(Long roomId);

    List<Game> findAllByRoomId(Long roomId);
}
