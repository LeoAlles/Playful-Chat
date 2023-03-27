import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Message from '../../../Entities/Message';
import LoginService from '../../../Services/LoginService';
import MessageService, { messageResponse, MessageMapper } from '../../../Services/MessageService';
import ChatMessage from './ChatMessage';

type props = {
    roomId: number
}

function Chat({roomId}: props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await MessageService.search(roomId)
            setMessages(messages)
        }
        fetchMessages()

        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
            },
            onConnect: () => {
                client.subscribe(`/topic/${roomId}`, message =>
                    handleMessage(message.body)
                );

            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        client.activate();
        return () => {
            client.deactivate();
        }
    }, [])

    function handleMessage(message: string) {
        const msgResponse: messageResponse = JSON.parse(message)
        setMessages(prevMessages => [...prevMessages, MessageMapper(msgResponse)])
    }
    const currentUser = LoginService.getLogged()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await MessageService.create({
            text: text,
            senderId: currentUser?.id ?? 0,
            roomId: roomId
        })
        setText("")
    };

    return (
        <div>
            <Container>
                {
                    messages.map(message => {
                        return <ChatMessage key={message.id} message={message} currentUser={currentUser!}/>
                    })
                }
            </Container>
            <FormWrapper onSubmit={handleSubmit}>
                <InputWrapper>
                    <Input
                        id="message"
                        type="text"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                    <Button type="submit">Send</Button>
                </InputWrapper>
            </FormWrapper>
        </div>
    )
}

export default Chat;

const Container = styled.div`
    width: 100%;
    height: 600px;
    margin: auto; 
    border: 1px ease #555;
    margin-top: 3em;
    overflow-y: scroll;
    background-color: #f5f5f5;
    border-radius: 1em;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.5);
`;

const FormWrapper = styled.form``;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2em 0 2em 0;
`;

const Input = styled.input`
    padding: 1em;
    font-size: 1.2em;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    width: 80%;
    margin-right: 1em;
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
    border-radius: 5px;

    :hover{
        background-color: #C47373;
        box-shadow: none;
    }
`;
