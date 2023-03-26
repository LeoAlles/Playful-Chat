import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import RoomService from "../../../Services/RoomService";
import Room from "../../../Entities/Room";


const RoomDisplay = () => {
    const {id} = useParams()
    const [room, setRoom] = useState<Room>()

    useEffect(()=>{
        const fetchRoom = async ()=>{
            const room = await RoomService.get(Number(id))
            setRoom(room)
        }
    },[])

  return (
    <RoomWrapper>
      <ChatWrapper>
        <RoomTitle>{room?.name}</RoomTitle>
        <CreatorName>Created by: {room?.creator.name}</CreatorName>
        <MessageWrapper>
          {room?.messages.map((message) => (
            <div key={message.id}>
              <CreatorName>{message.sender.name}</CreatorName>
              <MessageText>{message.text}</MessageText>
            </div>
          ))}
        </MessageWrapper>
      </ChatWrapper>
    </RoomWrapper>
  );
};

export default RoomDisplay;

const RoomWrapper = styled.div`
`;

const RoomTitle = styled.h2`
`;

const CreatorName = styled.p`
`;

const MessageWrapper = styled.div`
`;

const MessageText = styled.p`
`;

const ChatWrapper = styled.p`
`;