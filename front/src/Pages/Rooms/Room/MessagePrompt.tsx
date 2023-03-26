import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import User from '../../../Entities/User';
import MessageService from '../../../Services/MessageService'
import styled from 'styled-components';

type props = {
    currentUser: User
    roomId: number
}

function CreateMessageForm({currentUser, roomId}: props){
  const [text, setText] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    MessageService.create({
        text: text,
        roomId: roomId,
        senderId: currentUser.id,
    })
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label htmlFor="text">Message text:</Label>
      <Input
        type="text"
        id="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <Button type="submit">Send</Button>
    </FormWrapper>
  );
};

const FormWrapper = styled.form``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

export default CreateMessageForm;