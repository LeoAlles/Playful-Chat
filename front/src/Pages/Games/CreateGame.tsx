import { useState } from 'react';
import styled from 'styled-components';
import Game from '../../Entities/Game';
import GameService from "../../Services/GameService"
import SelectCoupon from '../../Components/Selects/SelectCoupon/SelectCoupon'
import Coupon from '../../Entities/Coupon';
import LoginService from '../../Services/LoginService';

const Container = styled.div``;

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

type CreateGameProps = {
  onCreate: (game: Game) => void;
};

function CreateGame() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const handleCouponChange = (selectedCoupon: Coupon | null) => {
    setCoupon(selectedCoupon);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await GameService.create({
        creatorId: LoginService.getLogged()?.id || 0,
        couponId: coupon?.id || 0,
        question: question || "",
        answer: answer || ""
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>
          Question
          <Input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </Label>
        <Label>
          Answer
          <Input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </Label>
        <Label>
          Coupon
          <SelectCoupon changeSelectedCoupon={handleCouponChange} />
        </Label>
        <Button type="submit">Create Game</Button>
      </Form>
    </Container>
  );
};

export default CreateGame;