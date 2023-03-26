import React, { ChangeEvent, useEffect, useState } from 'react'
import CouponService from '../../../Services/CouponService'
import styled from 'styled-components'
import Coupon from '../../../Entities/Coupon'

type SelectCouponProps = {
  changeSelectedCoupon: (selectedCoupon: Coupon | null) => void
}

const SelectCoupon: React.FC<SelectCouponProps> = ({
  changeSelectedCoupon,
}) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const coupons = await CouponService.searchAll();
      setCoupons(coupons);
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