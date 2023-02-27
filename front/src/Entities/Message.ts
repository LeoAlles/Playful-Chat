import { Moment } from "moment"
import User from "./User"

class Message {
    id: number
    text: string
    sender: User
    timestamp: Moment

    constructor( 
        id: number,
        text: string,
        sender: User,
        timestamp: Moment
    ){
        this.id = id
        this.text = text
        this.sender = sender
        this.timestamp = timestamp
    }
}

export default Message