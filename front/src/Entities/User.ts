import moment, { Moment } from "moment"

class User {
    id: number
    name: string
    email: string
    password: string
    birthDate: Moment

    constructor( 
        id: number,
        name: string,
        email: string,
        password: string,
        birthDate: Moment
    ){
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.birthDate = birthDate
    }
}

export default User