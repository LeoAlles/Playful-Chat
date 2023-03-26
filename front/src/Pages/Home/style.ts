import styled from "styled-components"

export const HomeContainer = styled.div`
    display:flex;
    justify-content: space-around;    
`

export const LoginCard = styled.div`
    width: 50%;
    padding: 2em;
    margin-top: 2em;
    background-color: #408E91;
    box-shadow: 10px 10px 10px #ccc;
    border-radius: 5px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    padding-bottom: 4em;   
    font-weight: bold;
`

export const Submit = styled.input`
    width: min-content;
    padding: 0.3em;
    background-color: #E49393;
    border: 0;
    margin-left: auto;
    box-shadow: 5px 5px 0px #ccc;
    font-weight: bold;
    border-radius: 5px;

    :hover{
        background-color: #E49393;
        box-shadow: none;
    }
`

export const Input = styled.input`
    padding: 0.5em;
    margin-top: 0.5em;
`