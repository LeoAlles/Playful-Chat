import { Moment } from "moment"

class Room {
    id: number
    name: string
    creator: string
    totalUsers: number
    dateCreated: Moment

    constructor( 
        id: number,
        name: string,
        creator: string,
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