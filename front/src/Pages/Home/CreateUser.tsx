import styled from "styled-components";
import { useState } from "react";
import User from "../../Entities/User";
import moment from "moment";
import UserService from "../../Services/UserService";
import Toaster from "../../Components/Toaster/Toaster";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      await UserService.create({
          name: name,
          email: email,
          password: password,
          birthdate: moment(birthDate)
      })
      setMessage("Creation Successful")
      setTimeout(()=>{
        window.location.href = "/"
      },1300)
    }catch{
      setMessage("Creation Failed")
    }
  };

  return (
    <Container>
      <Toaster message={message}></Toaster>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="name">Name:</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">Password:</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="birthDate">Birth Date:</Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </InputWrapper>
        <Button type="submit">Create User</Button>
      </Form>
    </Container>
  );
};

export default UserForm;

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