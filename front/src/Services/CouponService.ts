import axios from 'axios'
import { Moment } from 'moment'
import Coupon from '../Entities/Coupon'
import moment from 'moment'
import { UserResponse, UserMapper } from './UserService'
import User from '../Entities/User'

export type CouponResponse = {
  id: number
  store: string
  code: string
  creator: UserResponse
  owner: UserResponse | null
}

type CouponCreatePayload = {
  store: string
  code: string
  creatorId: number
}


export const CouponMapper = (response: CouponResponse): Coupon => {
  const creator = UserMapper(response.creator)
  const owner = response.owner ? UserMapper(response.owner) : null

  return new Coupon(
    response.id,
    response.store,
    response.code,
    creator,
    owner,
  )
}

export default class CouponService {
  private static endpoint = 'http://localhost:8080/api/coupons'

  public static async searchAll() {
    const response = await axios.get(this.endpoint)

    return response.data.map(CouponMapper)
  }

  public static async create(coupon: CouponCreatePayload) {
    const response = await axios.post(this.endpoint, coupon)

    return CouponMapper(response.data)
  }
}