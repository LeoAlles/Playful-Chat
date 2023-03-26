import { useState } from 'react';
import styled from 'styled-components';
import Game from '../../Entities/Game';
import GameService from "../../Services/GameService"
import SelectCoupon from '../../Components/Selects/SelectCoupon/SelectCoupon'
import Coupon from '../../Entities/Coupon';
import LoginService from '../../Services/LoginService';
import Toaster from '../../Components/Toaster/Toaster';

function CreateGame() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const [message, setMessage] = useState("");

  const handleCouponChange = (selectedCoupon: Coupon | null) => {
    setCoupon(selectedCoupon);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try{
      await GameService.create({
        creatorId: LoginService.getLogged()?.id || 0,
        couponId: coupon?.id || 0,
        question: question || "",
        answer: answer || ""
    });
  
      setMessage("Creation Successful")

      setTimeout(()=>{
        window.location.href = "/games/search"
      },1300)
    }catch{
      setMessage("Creation Failed")
    }
  };

  return (
    <>
      <Toaster message={message}></Toaster>
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>Question</Label>
            <Input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </InputWrapper>
          <InputWrapper>
            <Label>Answer</Label>
            <Input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </InputWrapper>
          <InputWrapper>
            <Label>Coupon</Label>
            <SelectCoupon changeSelectedCoupon={handleCouponChange} />
          </InputWrapper>
          <Button type="submit">Create Game</Button>
        </Form>
      </Container>
    </>
  );
};

export default CreateGame;

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