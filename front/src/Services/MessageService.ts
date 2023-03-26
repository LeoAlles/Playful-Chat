import { UserResponse } from "./UserService"
import moment, { Moment } from "moment"
import Message from "../Entities/Message"
import { UserMapper } from "./UserService"
import axios from "axios"

export type messageResponse = {
  id: number
  text: string
  timestamp: Moment
  sender: UserResponse
  roomId: number
}

export type messageCreate = {
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

export default class MessageService{
  private static endpoint = 'http://localhost:8080/api/message'

  public static async create(message: messageCreate) {
    const response: messageCreate = (await axios.post(this.endpoint, message)).data
  }
}
  