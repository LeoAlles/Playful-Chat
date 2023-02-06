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
    private static endpoint = 'api/rooms/search'

    static async searchAll(){
        const response = await axios.get<null, RoomResponse[]>(this.endpoint)
        return response.map(RoomMapper)
    }
}