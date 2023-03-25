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
    private static endpoint = 'http://localhost:8080/api/login'

    public static async login(userName: string, password: string){
        const loginPayload = {
            userName: userName,
            password: password
        }
        const response = (await axios.get<loginResponse>(this.endpoint, {params: loginPayload})).data

        if(response.logged == true){
            sessionStorage.setItem("logged", "true");
            sessionStorage.setItem("user",JSON.stringify(response.user));
        }

        return response.logged
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