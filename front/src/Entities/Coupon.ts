import { Moment } from "moment"
import User from "./User"

class Coupon {
    id: number
    code: string
    creator: User
    dateCreated: Moment
    owner: User | null

    constructor( 
        id: number,
        code: string,
        creator: User,
        dateCreated: Moment,
        owner: User | null
    ){
        this.id = id
        this.code = code
        this.creator = creator
        this.dateCreated = dateCreated
        this.owner = owner
    }
}

export default Coupon