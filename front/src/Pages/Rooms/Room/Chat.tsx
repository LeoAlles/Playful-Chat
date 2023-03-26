import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Message from '../../../Entities/Message';

import MessageService, { messageResponse } from '../../../Services/MessageService';


function Chat() {

    const [messages, setMessages] = useState<messageResponse[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {

        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {

            },
            onConnect: () => {

                // /topic/roomId
                client.subscribe('/topic/1', message =>
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

        console.log(msgResponse)
        setMessages(prevMessages => [...prevMessages, msgResponse])
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await MessageService.create({
            text: text,
            senderId: 1,
            roomId: 1
        })
    };


    console.log(messages)

    return (

        <div>
            <Container>
                {
                    messages.map(message => {

                        return <ChatMessage>

                            <p>{message.sender?.name}</p>
                            <p>{message.text}</p>
                            

                        </ChatMessage>
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
                </InputWrapper>
                <Button type="submit">Send</Button>
            </FormWrapper>
        </div>
    )
}

const Container = styled.div`
  width: 600px;
  height: 600px;
  margin: auto;
  background-color: white;
  border: 1px solid #555;
  margin-top: 3em;
`;

const ChatMessage = styled.div`
  width: 300px;
  height: 60px;
  font-size: 12px;
  background-color: gray;
  border: 1px solid #555;
  margin-top: 3em;
`;

const FormWrapper = styled.form``;

const InputWrapper = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

export default Chat;