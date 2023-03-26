import { Moment } from "moment"
import User from "./User"
import Message from "./Message"

class Room {
    id: number
    name: string
    creator: User
    dateCreated: Moment

    constructor( 
        id: number,
        name: string,
        creator: User,
        dateCreated: Moment
    ){
        this.id = id
        this.name = name
        this.creator = creator
        this.dateCreated = dateCreated
    }
}

export default Room