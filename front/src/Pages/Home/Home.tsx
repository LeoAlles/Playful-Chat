import React, { useState } from "react"
import LoginService from "../../Services/LoginService"
import { HomeContainer, LoginCard, Form, Label, Submit, Input} from "./style"

export default function Home(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function submitForm(event: any){
        event.preventDefault()
        await LoginService.login(name, password)
    }
    
    return(
        <HomeContainer>
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
                    <Submit type="submit" value="Log In"/>
                </Form>
            </LoginCard>
        </HomeContainer>
    )
}