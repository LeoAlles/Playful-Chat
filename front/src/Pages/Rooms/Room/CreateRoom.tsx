import React, { useState } from "react";
import Room from "./Room";
import User from "../../../Entities/User";
import moment from "moment";
import styled from "styled-components";
import LoginService from "../../../Services/LoginService";
import RoomService from "../../../Services/RoomService";
import Toaster from "../../../Components/Toaster/Toaster";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");

  const [message, setMessage] = useState("");

  const handleRoomSubmit = async (e: any) => {
    e.preventDefault();

    const currentUser = LoginService.getLogged()
    if(currentUser == undefined)
        return

    try{
      await RoomService.create({
          name: roomName,
          creatorId: currentUser.id,
          dateCreated: moment()
      })
      setMessage("Creation Successful")

      setTimeout(()=>{
        window.location.href = "/rooms/search"
      },1300)
    }catch{
      setMessage("Creation Failed")
    }
  };

  return (
    <Container>
      <Toaster message={message}></Toaster>
      <Form onSubmit={handleRoomSubmit}>
        <InputWrapper>
          <Label>Room Name</Label>
          <Input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </InputWrapper>
        <Button type="submit">Create Room</Button>
      </Form>
    </Container>
  );
}

export default CreateRoom;

const Container = styled.div`
  width: 75%;
  max-width: 50em;
  margin: auto;
  margin-top: 3em;
  padding: 2em;
  background-color: #f5f5f5;
  border-radius: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 25% 0 25%;
  min-width: 15em;

  > * {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.3em;
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 0.2em;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 1em;
  font-size: 1.2em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
`;

const Button = styled.button`
    width: min-content;
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