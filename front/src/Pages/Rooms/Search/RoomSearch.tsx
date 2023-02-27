import React, {useEffect, useState} from "react"
// import rooms from './room'
import RoomItem from "./RoomItem"
import { PageContainer } from "./style"
import Room from "../../../Entities/Room"
import RoomService from "../../../Services/RoomService"

export default function RoomSearch(){
    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(()=>{
        RoomService.searchAll()
            .then( data => setRooms(data))
    }, [])

    return (
        <PageContainer>
            <h1>Room Search:</h1>
            {(rooms ?? []).map( (room) => {
                return <RoomItem room={room}/>
            })}
        </PageContainer>
    )
}