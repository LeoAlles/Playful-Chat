import React, { useState } from "react"
import LoginService from "../../Services/LoginService"
import { HomeContainer, LoginCard, Form, Label, Submit, Input} from "./style"
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
            <Toaster message={message}></Toaster>
            <LoginCard>
                <Form onSubmit={(e) => {submitForm(e)}}>
                    <Label>
                        UserName:
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