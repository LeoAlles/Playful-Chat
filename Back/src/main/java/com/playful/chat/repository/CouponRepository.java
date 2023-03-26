package com.playful.chat.repository;

import com.playful.chat.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> findAllByOwnerId(Long ownerId);

}
