import { Moment } from "moment"
import User from "./User"

class Room {
    id: number
    name: string
    creator: User
    totalUsers: number
    dateCreated: Moment

    constructor( 
        id: number,
        name: string,
        creator: User,
        totalUsers: number,
        dateCreated: Moment
    ){
        this.id = id
        this.name = name
        this.creator = creator
        this.totalUsers = totalUsers
        this.dateCreated = dateCreated
    }
}

export default Room