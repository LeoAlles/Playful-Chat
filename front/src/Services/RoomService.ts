import Room from "../Entities/Room"
import moment, {Moment} from "moment";
import axios from 'axios'
import User from "../Entities/User";
import Message from "../Entities/Message";
import { UserResponse } from "./UserService";
import { messageResponse } from "./MessageService";
import { UserMapper } from "./UserService";
import { MessageMapper } from "./MessageService";

type RoomResponse = {
    id: number
    name: string
    creator: UserResponse
    dateCreated: string
}

type RoomCreatePayload = {
    name: string
    creatorId: number
    dateCreated: Moment
}


type RoomDeletePayload = {
    id: number
}

function RoomMapper(response :RoomResponse): Room{
    const dateCreated = moment(response.dateCreated)

    return new Room(
        response.id,
        response.name,
        UserMapper(response.creator),
        dateCreated
    )
}

export default class RoomService{
    private static endpoint = 'http://localhost:8080/api/rooms'

    public static async searchAll(){
        const response: RoomResponse[] = (await axios.get(this.endpoint)).data

        return response.map(RoomMapper)
    }

    public static async get(roomId: number){
        const response = await axios.get(this.endpoint + '/detail/' + roomId)

        return RoomMapper(response.data)
    }

    public static async create(room : RoomCreatePayload){
        const response = await axios.post(this.endpoint + "/create", room)

        return RoomMapper(response.data)
    }

    public static async delete(room : RoomDeletePayload){
        const response = await axios.delete(this.endpoint + `/${room.id}`)

        return RoomMapper(response.data)
    }
}