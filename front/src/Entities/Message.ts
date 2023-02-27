import { Moment } from "moment"
import User from "./User"
import Room from './Room'

class Message {
    id: number
    text: string
    sender: User
    timestamp: Moment
    room: Room

    constructor( 
        id: number,
        text: string,
        sender: User,
        timestamp: Moment,
        room: Room
    ){
        this.id = id
        this.text = text
        this.sender = sender
        this.timestamp = timestamp
        this.room = room
    }
}

export default Message