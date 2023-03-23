import { UserResponse } from "./UserService"
import { Moment } from "moment"

export type messageResponse = {
    id: number
    text: string
    timestamp: Moment
    senderId: number
    roomId: number
}