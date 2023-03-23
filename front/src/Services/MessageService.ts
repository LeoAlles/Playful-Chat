import { UserResponse } from "./UserService"
import { Moment } from "moment"

export type messageResponse = {
    id: number
    text: string
    timestamp: Moment
    senderId: UserResponse
    roomId: number
}

export type messageCreate = {
    id: number
    text: string
    timestamp: Moment
    senderId: number
    roomId: number
}