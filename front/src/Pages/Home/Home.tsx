import React, { useState } from "react"
import LoginService from "../../Services/LoginService"
import { LoginCard, Form, Label} from "./style"
import styled from "styled-components";
import NavButton from "../../Components/NavButton/NavButton";
import Toaster from "../../Components/Toaster/Toaster";

export default function Home(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function submitForm(event: any){
        event.preventDefault()
        try{
            await LoginService.login(name, password)
            setMessage("Login Successful!")
            setTimeout(()=>{
                window.location.href = "/rooms/search"
            },1300)
        }catch{
            setMessage("Login Failed")
        }
    }
    
    return(
        <HomeContainer>
            <Title>
                Welcome to Playful Chat!
            </Title>
            <Toaster message={message}></Toaster>
            <LoginCard>
                <Form onSubmit={(e) => {submitForm(e)}}>
                    <LoginPrompt>
                        Log In:
                    </LoginPrompt>
                    <Label>
                        Email:
                        <Input 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Label>
                    <Label>
                        Password:
                        <Input 
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Label>
                    <FlexContainer>
                        <NavButton link={'users/create'}>Sign UP</NavButton>
                        <Submit type="submit" value="Log In"/>
                    </FlexContainer>
                </Form>
            </LoginCard>
        </HomeContainer>
    )
}

const FlexContainer = styled.div `
    display: flex;
    justify-content: right;
`

const Input = styled.input`
    padding: 1em;
    font-size: 1.2em;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    margin-right: 1em;
    margin-top: 0.5em;
`;

const LoginPrompt = styled.div `
    display: flex;
    flex-direction: column;
    padding-bottom: 1.5em;   
    font-weight: bold;
    font-size: 1.6em;
    color: #ddd;
`

const HomeContainer = styled.div`
    width: 50%;
    margin-left:25%;
    margin-right: 25%;
    justify-content: space-around;
`

const Title = styled.div`
    flex-direction: column;
    font-weight: bold;
    font-size: 2.5em;
    text-align: center;
    margin-top: 1em;
    color: #333;
`

const Submit = styled.input`
    width: min-content;
    padding: 0.3em;
    background-color: #E49393;
    border: 0;
    margin-left: auto;
    margin-right: 1em;
    padding: 0 1em 0 1em;
    box-shadow: 5px 5px 0px #ccc;
    font-weight: bold;
    border-radius: 5px;

    :hover{
        background-color: #E49393;
        box-shadow: none;
    }
`