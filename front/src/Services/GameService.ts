import axios from "axios"
import Game from "../Entities/Game"
import { UserResponse, UserMapper } from "./UserService"
import { CouponResponse, CouponMapper } from "./CouponService"
import User from "../Entities/User"
import Coupon from "../Entities/Coupon"
import moment from "moment"

export type createGamePayload = {
    creatorId: number
    couponId: number
    question: string
    answer: string
}

export type gameResponse = {
    id: number
    creator: UserResponse
    coupon: CouponResponse
    question: string
    answer: string
}

function GameMapper(response: gameResponse): Game {
    return new Game(
        response.id,
        UserMapper(response.creator),
        CouponMapper(response.coupon),
        response.question,
        response.answer,
        undefined
    )
}

export default class GameService {
  private static endpoint = 'http://localhost:8080/api/games' 
  
  public static async searchAll() {
    const response: gameResponse[] = (await axios.get(this.endpoint)).data

    return response.map(GameMapper)
  }

  public static async create(game: createGamePayload) {
    await axios.post(this.endpoint, game)
  }

  public static async searchGamesInRoom(roomId: number) {
    const response: gameResponse[] = (await axios.get(this.endpoint + "/room/" + roomId)).data

    return response.map(GameMapper)
  }
}