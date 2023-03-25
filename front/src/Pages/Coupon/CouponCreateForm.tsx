import React, { useState } from "react";
import styled from "styled-components";
import User from "../../Entities/User";
import SelectUser from "../../Components/Selects/SelectUser/SelectUser";
import CouponService from "../../Services/CouponService";
import LoginService from "../../Services/LoginService";

const FormWrapper = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

function CouponForm() {
  const [store, setStore] = useState("");
  const [code, setCode] = useState("");
  const [owner, setOwner] = useState<User | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const creator = LoginService.getLogged();
    if(creator == undefined){
      return
    }

    await CouponService.create({
      code: code,
      store: store,
      creatorId: creator.id
    })

    setStore("");
    setCode("");
    setOwner(null);
  };


  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="store">Store:</Label>
          <Input
            type="text"
            id="store"
            value={store}
            onChange={(event) => setStore(event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="code">Code:</Label>
          <Input
            type="text"
            id="code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </div>
        <Button type="submit">Create Coupon</Button>
      </form>
    </FormWrapper>
  );
}

export default CouponForm;