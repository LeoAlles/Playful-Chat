package com.playful.chat.repository;

import com.playful.chat.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {


}
