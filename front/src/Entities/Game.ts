import User from './User'
import Coupon from './Coupon'

type Game = {
    id: number
    creator: User
    coupon: Coupon
    question: string
    answer: string
    active: boolean
    roomId: number | undefined
}

export default Game