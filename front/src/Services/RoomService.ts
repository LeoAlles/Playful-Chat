import Room from "../Entities/Room"
import moment from "moment";
import axios from 'axios'
import User from "../Entities/User";

type RoomResponse = {
    id: number
    name: string
    creator: User
    totalUsers: number
    dateCreated: string
}

type RoomCreatePayload = {
    name: string
    creator: string
    totalUsers: number
    dateCreated: string
}

type RoomUpdatePayload = {
    id: number
    name: string
    creator: string
    totalUsers: number
    dateCreated: string
}

type RoomDeletePayload = {
    id: number
}

function RoomMapper(response :RoomResponse): Room{
    const dateCreated = moment(response.dateCreated)
    return new Room(
        response.id,
        response.name,
        response.creator,
        response.totalUsers,
        dateCreated
    )
}

export default class RoomService{
    private static endpoint = 'http://localhost:8080/api/rooms'

    public static async searchAll(){
        const response = await axios.get(this.endpoint)

        return response.data.map(RoomMapper)
    }

    public static async create(room : RoomCreatePayload){
        const response = await axios.post(this.endpoint, room)

        return RoomMapper(response.data)
    }

    public static async update(room : RoomUpdatePayload){
        const response = await axios.put(this.endpoint, room)

        return RoomMapper(response.data)
    }

    public static async delete(room : RoomDeletePayload){
        const response = await axios.delete(this.endpoint + `/${room.id}`)

        return RoomMapper(response.data)
    }
}