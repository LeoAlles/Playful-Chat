import { Moment } from "moment"
import User from "./User"
import Message from "./Message"

class Room {
    id: number
    name: string
    creator: User
    dateCreated: Moment
    messages: Message[]

    constructor( 
        id: number,
        name: string,
        creator: User,
        messages: Message[],
        dateCreated: Moment
    ){
        this.id = id
        this.name = name
        this.creator = creator
        this.messages = messages
        this.dateCreated = dateCreated
    }
}

export default Room