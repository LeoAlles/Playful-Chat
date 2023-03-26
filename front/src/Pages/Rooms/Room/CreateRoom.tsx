import React, { useState } from "react";
import Room from "./Room";
import User from "../../../Entities/User";
import moment from "moment";
import styled from "styled-components";
import LoginService from "../../../Services/LoginService";
import RoomService from "../../../Services/RoomService";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");

  const handleRoomSubmit = async (e: any) => {
    e.preventDefault();

    const currentUser = LoginService.getLogged()
    if(currentUser == undefined)
        return

    await RoomService.create({
        name: roomName,
        creatorId: currentUser.id,
        dateCreated: moment()
    })
  };

  return (
    <Form onSubmit={handleRoomSubmit}>
      <Input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <Button type="submit">Create Room</Button>
    </Form>
  );
}

export default CreateRoom;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid grey;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid grey;
  background-color: white;
  color: black;
`;
