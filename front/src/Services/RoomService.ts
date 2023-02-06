import Room from "../Entities/Room"
import moment from "moment";
import axios from 'axios'

type RoomResponse = {
    id: number
    name: string
    creator: string
    totalUsers: number
    dateCreated: string
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
    private static endpoint = 'http://localhost:8080/api/rooms/search'

    public static async searchAll(){
        const response = await axios.get(this.endpoint)

        return response.data.map(RoomMapper)
    }
}