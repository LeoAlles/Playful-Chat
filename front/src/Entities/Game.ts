import User from './User'
import Coupon from './Coupon'

class Game {
    id: number
    creator: User
    coupon: Coupon
    question: string
    answer: string
    roomId: number | undefined

    constructor(
        id: number,
        creator: User,
        coupon: Coupon,
        question: string,
        answer: string,
        roomId: number | undefined
    ) {
        this.id = id
        this.creator = creator
        this.coupon = coupon
        this.question = question
        this.answer = answer
        this.roomId = roomId
    }
}

export default Game