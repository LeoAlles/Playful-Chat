package com.playful.chat.service;

import com.playful.chat.controller.request.CreateCouponRequest;
import com.playful.chat.controller.request.DeliverCouponRequest;
import com.playful.chat.controller.response.CouponResponse;
import com.playful.chat.mapper.CouponMapper;
import com.playful.chat.model.Coupon;
import com.playful.chat.model.UserModel;
import com.playful.chat.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class CouponService {

    @Autowired
    private FindUserService findUserService;

    @Autowired
    private CouponRepository couponRepository;

    public Long create(CreateCouponRequest createCouponRequest) {

        UserModel creator = findUserService.findById(createCouponRequest.getCreatorId());

        Coupon coupon = CouponMapper.toEntity(createCouponRequest);

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

    public List<CouponResponse> list() {
        return couponRepository.findAll().stream().map(CouponMapper::toResponse).collect(Collectors.toList());
    }
}
