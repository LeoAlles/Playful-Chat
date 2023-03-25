package com.playful.chat.service;

import com.playful.chat.model.Coupon;
import com.playful.chat.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FindCouponService {

    @Autowired
    private CouponRepository couponRepository;


    public Coupon findById(Long couponId) {
        return couponRepository.findById(couponId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cupom não encontrado")
        );
    }
}
