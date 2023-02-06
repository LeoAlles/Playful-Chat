import React from "react"
import rooms from './room'
import RoomItem from "./RoomItem"
import { PageContainer } from "./style"

export default function RoomSearch(){
    return (
        <PageContainer>
            <h1>Room Search:</h1>
            {rooms.map( (room) => {
                return <RoomItem room={room}/>
            })}
        </PageContainer>
    )
}