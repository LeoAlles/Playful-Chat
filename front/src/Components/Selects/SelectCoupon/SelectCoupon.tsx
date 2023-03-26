import React, { ChangeEvent, useEffect, useState } from 'react'
import CouponService from '../../../Services/CouponService'
import styled from 'styled-components'
import Coupon from '../../../Entities/Coupon'

type SelectCouponProps = {
  changeSelectedCoupon: (selectedCoupon: Coupon | null) => void
}

const SelectCouponWrapper = styled.div``

const SelectCouponLabel = styled.label``

const SelectCouponSelect = styled.select``

const SelectCouponOption = styled.option``

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
    <SelectCouponWrapper>
      <SelectCouponLabel htmlFor="select-coupon">Select Coupon:</SelectCouponLabel>
      <SelectCouponSelect id="select-coupon" onChange={handleSelectChange}>
        <SelectCouponOption value="">Select a coupon</SelectCouponOption>
        {coupons.map((coupon) => (
          <SelectCouponOption key={coupon.id} value={coupon.id}>
            {coupon.store} - {coupon.code}
          </SelectCouponOption>
        ))}
      </SelectCouponSelect>
    </SelectCouponWrapper>
  )
}

export default SelectCoupon