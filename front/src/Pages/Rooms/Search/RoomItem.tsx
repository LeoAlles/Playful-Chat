import React from "react";
import Room from "../../../Entities/Room";
import RoomService from "../../../Services/RoomService";
import { ItemContainter, FieldContainer, Name, Value } from "./style";

type props = {
    room: Room
}

export default function({room}:props){
    const deleteRoom = async()=>{
        RoomService.delete({id: room.id})
    }

    return(
        <ItemContainter onClick={() => {window.location.href = `rooms/${room.id}`}}>
            <FieldContainer>
                <Name>Room Name</Name>
                <Value>{room.name}</Value>
            </FieldContainer>
            <FieldContainer>
                <Name>Creator</Name>
                <Value>{room.creator.name}</Value>
            </FieldContainer>
            <FieldContainer>
                <Name>Created On</Name>
                <Value>{room.dateCreated.format('DD/MM/YYYY')}</Value>
            </FieldContainer>
            <button onClick={deleteRoom}>Delete Room</button>
        </ItemContainter>
    )
}