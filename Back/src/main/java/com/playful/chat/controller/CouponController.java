package com.playful.chat.controller;

import com.playful.chat.controller.request.CreateCouponRequest;
import com.playful.chat.controller.request.DeliverCouponRequest;
import com.playful.chat.controller.response.CouponResponse;
import com.playful.chat.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @PostMapping
    public Long createCoupon(@Valid @RequestBody CreateCouponRequest createCouponRequest) {
        return couponService.create(createCouponRequest);
    }

    @GetMapping
    public List<CouponResponse> list() {
        return couponService.list();
    }


    @PutMapping("/deliver/{couponId}")
    public String deliverCoupon(@PathVariable Long couponId, @Valid @RequestBody DeliverCouponRequest deliverCouponRequest) {
        return couponService.deliver(couponId, deliverCouponRequest);
    }

}
