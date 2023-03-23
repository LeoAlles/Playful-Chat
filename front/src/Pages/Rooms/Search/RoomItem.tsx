import React from "react";
import Room from "../../../Entities/Room";
import { ItemContainter, FieldContainer, Name, Value } from "./style";

type props = {
    room: Room
}

export default function({room}:props){
    return(
        <ItemContainter>
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
        </ItemContainter>
    )
}