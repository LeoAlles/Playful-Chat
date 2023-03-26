package com.playful.chat.mapper;

import com.playful.chat.controller.request.CreateCouponRequest;
import com.playful.chat.controller.response.CouponResponse;
import com.playful.chat.model.Coupon;

public class CouponMapper {

    public static Coupon toEntity(CreateCouponRequest createCouponRequest) {
        return Coupon.builder()
                .code(createCouponRequest.getCode())
                .store(createCouponRequest.getStore())
                .build();
    }

    public static CouponResponse toResponse(Coupon coupon) {
        return CouponResponse.builder()
                .id(coupon.getId())
                .code(coupon.getCode())
                .owner(UserMapper.toResponse(coupon.getOwner()))
                .creator(UserMapper.toResponse(coupon.getCreator()))
                .store(coupon.getStore())
                .build();
    }
}
