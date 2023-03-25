import { UserResponse } from "./UserService"
import moment, { Moment } from "moment"
import Message from "../Entities/Message"
import { UserMapper } from "./UserService"

export type messageResponse = {
    id: number
    text: string
    timestamp: Moment
    sender: UserResponse
    roomId: number
}

export type messageCreate = {
    id: number
    text: string
    timestamp: Moment
    senderId: number
    roomId: number
}

export const MessageMapper = (response: messageResponse): Message => {
    const timestamp = moment(response.timestamp)
  
    return new Message(
      response.id,
      response.text,
      UserMapper(response.sender),
      timestamp,
      response.roomId
    )
  }
  