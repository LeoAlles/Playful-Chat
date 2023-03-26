import { UserResponse } from "./UserService"
import moment, { Moment } from "moment"
import Message from "../Entities/Message"
import { UserMapper } from "./UserService"
import axios from "axios"

export type messageResponse = {
  id: number
  text: string
  timestamp: Moment
  sender: UserResponse | null
  roomId: number
}

export type messageCreate = {
  text: string
  senderId: number
  roomId: number
}

export const MessageMapper = (response: messageResponse): Message => {
  const timestamp = moment(response.timestamp)

  return new Message(
    response.id,
    response.text,
    response.sender ? UserMapper(response.sender) : undefined,
    timestamp,
    response.roomId
  )
}

export default class MessageService{
  private static endpoint = 'http://localhost:8080/api/chat'

  public static async create(message: messageCreate) {
    const response: messageCreate = (await axios.post(this.endpoint, message)).data
  }

  public static async search(roomId: number) {
    const response: messageResponse[] = (await axios.post(this.endpoint, roomId)).data

    return response.map(MessageMapper)
  }

}
  