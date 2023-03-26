import User from "./User"

class Coupon {
    id: number
    store: string
    code: string
    creator: User
    owner: User | null

    constructor( 
        id: number,
        store: string,
        code: string,
        creator: User,
        owner: User | null
    ){
        this.id = id
        this.store = store
        this.code = code
        this.creator = creator
        this.owner = owner
    }
}

export default Coupon