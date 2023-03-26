import React from 'react';
import styled from 'styled-components';
import Message from '../../../Entities/Message';
import User from '../../../Entities/User';

type props ={
    message: Message,
    currentUser: User
}

function colorResolver(message: Message, currentUser: User){
    if(message.sender == null)
        return '#E49393'
    else if(message.sender.id == currentUser.id)
        return '#408E91'
    else
        return '#D8D8D8'
}

function marginResolver(message: Message, currentUser: User){
    if(!message.sender)
        return 'space-around'
    else if(message.sender.id == currentUser.id)
        return 'flex-end'
    else
        return 'flex-start'
}

function senderResolver(message: Message, currentUser: User){
    if(message.sender == null)
        return 'System:'
    else if(message.sender.id == currentUser.id)
        return 'You:'
    else
        return `${message.sender.name}:`
}

function ChatMessage({message, currentUser}: props) {
    const messageColor = colorResolver(message, currentUser)
    const margin = marginResolver(message, currentUser)
    
    const MessageContainer = styled.div`
      display: flex;
      justify-content: ${margin};
      margin-bottom: 10px;
      width: 97%;
      margin: 0.2em 0.4em 0.2em 0.2em;
    `;
    
    return (
        <MessageContainer>
            <MessageContent color={messageColor}>
                <Sender>{senderResolver(message, currentUser)}</Sender>
                <MessageText>{message.text}</MessageText>
            </MessageContent>
        </MessageContainer>
    );
}

export default ChatMessage;

const Sender = styled.div`
font-weight: bold;
margin-bottom: 5px;
`;

const MessageText = styled.div`
border-radius: 10px;
`;

const MessageContent = styled.div`
background-color: ${props => props.color};
width: 60%;
border-radius: 1em;
padding:0.5em;
`;