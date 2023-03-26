import React, { useState } from "react";
import Room from "../../../Entities/Room";
import RoomService from "../../../Services/RoomService";
import styled from "styled-components";
import LoginService from "../../../Services/LoginService";
import Toaster from "../../../Components/Toaster/Toaster";
import Message from "../../../Entities/Message";

type props = {
    room: Room
    onlyMine: boolean
}

export default function({room, onlyMine}:props){
    const [message, setMessage] = useState("")

    const deleteRoom = async()=>{
        try{
            RoomService.delete({id: room.id})
            setMessage("Room Deleted")
            setTimeout(()=>{
                window.location.href = "/rooms/search"
            },1300)
        }catch{
            setMessage("Deletion Failed")
        }
    }

    return(
        <ItemContainter key={room.id}>
            <Toaster message={message}></Toaster>
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
            <OptionsContainer>
                <Button onClick={() => {window.location.href = `rooms/${room.id}`}}>Go to Room</Button>
                {onlyMine &&<Button onClick={deleteRoom}>Delete Room</Button>}
            </OptionsContainer>
        </ItemContainter>
    )
}

const ItemContainter = styled.div`
    margin: 2em;
    background-color: #408E91;
    padding: 2em;
    box-shadow: 10px 10px 0px #ccc;
    border-radius: 5px;
`

const FieldContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5em;
`

const Name = styled.div`
    text-align: left;
    font-weight: bold;
`

const Value = styled.div`
    text-align: right;
    font-style: italic;
`
const Button = styled.button`
    width: fit-content;
    padding: 0.7em;
    background-color: #E49393;
    border: 0;
    box-shadow: 5px 5px 0px #ccc;
    font-weight: bold;
    margin-left: auto;
    font-size: 1em;

    :hover{
        background-color: #C47373;
        box-shadow: none;
    }
`;

const OptionsContainer = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content:end;
    align-items: flex-end;
    width: 100%;
    > * {
        margin-left: 2em;
    }

`
