import User from "../Entities/User"
import axios from "axios"
import { UserResponse } from "./UserService"

export type loginPayload = {
    userName: string
    password: string
}

export type loginResponse = {
    user: UserResponse
    logged: boolean
}

export default class LoginService{
    private static endpoint = 'http://localhost:3000/login'

    public static async login(userName: string, passWord: string){
        
        const response = await axios.post(this.endpoint, {}, {
            auth: {
                username: userName,
                password: passWord
            }
        })

        console.log(response)

    }

    public static getLogged(): User | undefined{
        const logged = sessionStorage.getItem("logged")
        if(logged == "true"){
            return JSON.parse(sessionStorage.getItem("user") as string) as User
        }
        else{
            return undefined
        }
    }
}