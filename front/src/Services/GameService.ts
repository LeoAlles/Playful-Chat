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
  
    // public static searchAll(): Promise<Game[]> {
    //   return new Promise((resolve, reject) => {
    //     const mockUser1 = new User(1, 'John Doe', 'john.doe@example.com', 'password', moment('2000-01-01'));
    //     const mockUser2 = new User(2, 'Jane Doe', 'jane.doe@example.com', 'password', moment('2001-01-01'));
    
    //     const mockCoupon1 = new Coupon(1, 'Amazon', 'AMAZON10', mockUser1, null);
    //     const mockCoupon2 = new Coupon(2, 'Target', 'TARGET20', mockUser2, null);
    
    //     const mockGame1 = new Game(1, mockUser1, mockCoupon1, 'What is the capital of France?', 'Paris', undefined);
    //     const mockGame2 = new Game(2, mockUser2, mockCoupon2, 'What is the largest country in the world by land area?', 'Russia', undefined);
    
    //     const mockGames = [mockGame1, mockGame2];
    
    //     resolve(mockGames);
    //   })
    // }    
    
    public static async searchAll() {
      const response: gameResponse[] = (await axios.get(this.endpoint)).data
  
      return response.map(GameMapper)
    }
  
    public static async create(game: createGamePayload) {
      const response: gameResponse = (await axios.post(this.endpoint, game)).data
  
      return GameMapper(response)
    }
  }