import styled from "styled-components";
import { useState } from "react";
import User from "../../Entities/User";
import moment from "moment";
import UserService from "../../Services/UserService";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await UserService.create({
        name: name,
        email: email,
        password: password,
        birthdate: moment(birthDate)
    })
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
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
    </FormWrapper>
  );
};

export default UserForm;


const FormWrapper = styled.form``;

const InputWrapper = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;
