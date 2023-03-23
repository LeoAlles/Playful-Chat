import { Moment } from "moment"
import User from "./User"
import Room from './Room'

class Message {
    id: number
    text: string
    sender: User
    timestamp: Moment
    roomId: number

    constructor( 
        id: number,
        text: string,
        sender: User,
        timestamp: Moment,
        roomId: number
    ){
        this.id = id
        this.text = text
        this.sender = sender
        this.timestamp = timestamp
        this.roomId = roomId
    }
}

export default Message