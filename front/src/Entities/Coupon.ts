import { Moment } from "moment"
import User from "./User"

class Coupon {
    id: number
    code: string
    creator: User
    dateCreated: Moment

    constructor( 
        id: number,
        code: string,
        creator: User,
        dateCreated: Moment
    ){
        this.id = id
        this.code = code
        this.creator = creator
        this.dateCreated = dateCreated
    }
}

export default Coupon