import React, {useEffect, useState} from "react"
// import rooms from './room'
import RoomItem from "./RoomItem"
import { PageContainer } from "./style"
import Room from "../../../Entities/Room"
import RoomService from "../../../Services/RoomService"
import styled
 from "styled-components"
import NavButton from "../../../Components/NavButton/NavButton"

export default function RoomSearch(){
    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(()=>{
        RoomService.searchAll()
            .then( data => setRooms(data))
    }, [])

    return (
        <PageContainer>
            <TopContainer>
                <Title>Rooms List</Title>
                <NavButton link={'/rooms/create'}>Create Room</NavButton>
            </TopContainer>
            {(rooms ?? []).map( (room) => {
                return <RoomItem room={room}/>
            })}
        </PageContainer>
    )
}

const Title = styled.h2`
`;

const TopContainer = styled.div`
  display:flex;
  margin: 1.5em;
  border-bottom: 1px solid #555;
  justify-content: space-around;
`;