import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Message from '../../Entities/Message';


function Chat() {
    const [messages, setMessages] = useState<string[]>([]);


    useEffect(() => {

        //fetch room messages

    },[])

    function handleMessage(message: string) {
        console.log(message)
        setMessages(prevMessages => [...prevMessages, message])
    }

    console.log(messages)

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

    client.activate()


    return (
        <Container>
            
        </Container>
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

export default Chat;