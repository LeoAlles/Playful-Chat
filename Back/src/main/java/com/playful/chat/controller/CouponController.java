package com.playful.chat.controller;

import com.playful.chat.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/new/{creatorId}")
    public Long createCoupon(@PathVariable Long creatorId) {
        return couponService.create(creatorId);
    }

    @PutMapping("/deliver/{couponId}")
    public String deliverCoupon(@PathVariable Long couponId, @Valid @RequestBody DeliverCouponRequest deliverCouponRequest) {
        return couponService.deliver(couponId, deliverCouponRequest);
    }

}
