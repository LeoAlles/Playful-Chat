import React, { ChangeEvent, useEffect, useState } from 'react'
import CouponService from '../../../Services/CouponService'
import styled from 'styled-components'
import Coupon from '../../../Entities/Coupon'
import LoginService from '../../../Services/LoginService'

type props = {
  changeSelectedCoupon: (selectedCoupon: Coupon | null) => void
}

function SelectCoupon({changeSelectedCoupon}: props){
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const coupons = await CouponService.searchAll();
      const me = LoginService.getLogged()?.id
      if(!me) return

      setCoupons(coupons.filter((c: Coupon) => c.creator.id == me));
    };

    fetchCoupons();
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCouponId = parseInt(event.target.value)
    const selectedCoupon = coupons.find((coupon) => coupon.id === selectedCouponId)
    changeSelectedCoupon(selectedCoupon ?? null)
  }

  return (
      <SelectCouponSelect id="select-coupon" onChange={handleSelectChange}>
        <SelectCouponOption value="">Select a coupon</SelectCouponOption>
        {coupons.map((coupon) => (
          <SelectCouponOption key={coupon.id} value={coupon.id}>
            {coupon.store}
          </SelectCouponOption>
        ))}
      </SelectCouponSelect>
  )
}

export default SelectCoupon

const SelectCouponSelect = styled.select`
  padding: 1em;
  font-size: 1.2em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
`

const SelectCouponOption = styled.option`
  padding: 1em;
  font-size: 0.9em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
`