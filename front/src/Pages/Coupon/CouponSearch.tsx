import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CouponService from "../../Services/CouponService";
import Coupon from "../../Entities/Coupon";

const StyledCouponList = styled.ul`
`;

const StyledCouponItem = styled.li`
`;

function CouponSearch() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const coupons = await CouponService.searchAll();
      setCoupons(coupons);
    };

    fetchCoupons();
  }, []);

  return (
    <div>
      <h2>Coupon Search</h2>
      <StyledCouponList>
        {coupons.map((coupon) => (
          <StyledCouponItem key={coupon.id}>
            <div>Store: {coupon.store}</div>
            <div>Code: {coupon.code}</div>
            <div>Creator: {coupon.creator.name}</div>
            {coupon.owner && <div>Owner: {coupon.owner.name}</div>}
          </StyledCouponItem>
        ))}
      </StyledCouponList>
    </div>
  );
};

export default CouponSearch;