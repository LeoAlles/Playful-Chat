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
      <RoomTitle>{room?.name}</RoomTitle>
      <CreatorName>Created by: {room?.creator.name}</CreatorName>
      <MessageWrapper>
        {room?.messages.map((message) => (
          <div key={message.id}>
            <MessageText>{message.text}</MessageText>
            <CreatorName>{message.sender.name}</CreatorName>
          </div>
        ))}
      </MessageWrapper>
    </RoomWrapper>
  );
};

export default RoomDisplay;

const RoomWrapper = styled.div`
  /* your room styles here */
`;

const RoomTitle = styled.h2`
  /* your room title styles here */
`;

const CreatorName = styled.p`
  /* your creator name styles here */
`;

const MessageWrapper = styled.div`
  /* your message wrapper styles here */
`;

const MessageText = styled.p`
  /* your message text styles here */
`;