import axios from 'axios'
import { Moment } from 'moment'
import Coupon from '../Entities/Coupon'
import moment from 'moment'
import { UserResponse, UserMapper } from './UserService'

type CouponResponse = {
  id: number
  code: string
  creator: UserResponse
  dateCreated: string
  owner: UserResponse | null
}

type CouponCreatePayload = {
  code: string
  creatorId: number
  dateCreated: Moment
  owner?: number
}

type CouponUpdatePayload = {
  id: number
  code: string
  creatorId?: number
  dateCreated?: Moment
  ownerId?: number
}

type CouponDeletePayload = {
  id: number
}

const CouponMapper = (response: CouponResponse): Coupon => {
  const creator = UserMapper(response.creator)
  const dateCreated = moment(response.dateCreated)
  const owner = response.owner ? UserMapper(response.owner) : null

  return new Coupon(
    response.id,
    response.code,
    creator,
    dateCreated,
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

  public static async update(coupon: CouponUpdatePayload) {
    const response = await axios.put(this.endpoint, coupon)

    return CouponMapper(response.data)
  }

  public static async delete(coupon: CouponDeletePayload) {
    const response = await axios.delete(
      `${this.endpoint}/${coupon.id}`,
    )

    return CouponMapper(response.data)
  }
}