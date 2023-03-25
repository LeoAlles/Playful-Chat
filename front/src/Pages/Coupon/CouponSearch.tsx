import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CouponService from "../../Services/CouponService";
import Coupon from "../../Entities/Coupon";
import NavButton from "../../Components/NavButton/NavButton";

const StyledCouponList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledCouponItem = styled.div`
  margin-bottom: 1em;
`;

const Container = styled.div`
  width: 60%;
  margin: auto;
  background-color: #D8D8D8;
  border: 1px solid #555;
  margin-top: 3em;
`;

const Title = styled.h2`
`;

const TopContainer = styled.div`
  display:flex;
  margin: 1.5em;
  border-bottom: 1px solid #555;
  justify-content: space-around;
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
    <Container>
      <TopContainer>
        <Title>Coupon Search</Title><NavButton 
          link={'/coupons/create'}
        >Create Coupon</NavButton>
      </TopContainer>
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
    </Container>
  );
};

export default CouponSearch;