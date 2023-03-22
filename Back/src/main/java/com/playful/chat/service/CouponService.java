package com.playful.chat.service;

import com.playful.chat.controller.request.DeliverCouponRequest;
import com.playful.chat.model.Coupon;
import com.playful.chat.model.UserModel;
import com.playful.chat.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class CouponService {

    @Autowired
    private FindUserService findUserService;

    @Autowired
    private CouponRepository couponRepository;

    public Long create(Long creatorId) {

        UserModel creator = findUserService.findById(creatorId);

        Coupon coupon = new Coupon();
        Random random = new Random();

        coupon.setCode(String.format("%04d", random.nextInt(10000)));
        coupon.setCreator(creator);
        coupon.setDateCreated(LocalDateTime.now());

        couponRepository.save(coupon);

        return coupon.getId();
    }

    public String deliver(Long couponId, DeliverCouponRequest deliverCouponRequest) {

        UserModel owner = findUserService.findById(deliverCouponRequest.getOwnerId());

        Coupon coupon = couponRepository.findById(couponId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cupom não encontrado")
        );

        coupon.setOwner(owner);
        couponRepository.save(coupon);

        return coupon.getCode();
    }
}
