import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import RoomService from "../../../Services/RoomService";
import Room from "../../../Entities/Room";
import LoginService from "../../../Services/LoginService";
import MessagePrompt from './MessagePrompt'
import Message from "../../../Entities/Message";
import MessageService from "../../../Services/MessageService";
import Chat from "./Chat";

const RoomDisplay = () => {
  const {id} = useParams()
  const [room, setRoom] = useState<Room>()

  const currentUser = LoginService.getLogged()

  useEffect(()=>{
      const fetchRoom = async ()=>{
          const room = await RoomService.get(parseInt(id!))
          setRoom(room)
      }

      fetchRoom()
  },[])

  return (
    room ?
      <RoomWrapper>
        <RoomTitle>{room?.name}</RoomTitle>
        <CreatorName>Created by: {room?.creator.name}</CreatorName>
        <Chat roomId={room?.id}/>
      </RoomWrapper> 
      : <></>
  );
};

export default RoomDisplay;

const RoomWrapper = styled.div`
  width: 50%;
  margin: 0 25% 0 25%;
  height: 100%;
`;

const RoomTitle = styled.h2`
`;

const CreatorName = styled.p`
`;

const MessageWrapper = styled.div`
`;

const MessageText = styled.p`
`;

