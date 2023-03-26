import React, { useState } from "react";
import styled from "styled-components";
import User from "../../Entities/User";
import SelectUser from "../../Components/Selects/SelectUser/SelectUser";
import CouponService from "../../Services/CouponService";
import LoginService from "../../Services/LoginService";
import Toaster from "../../Components/Toaster/Toaster";

function CouponForm() {
  const [store, setStore] = useState("");
  const [code, setCode] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const creator = LoginService.getLogged();
    if(creator == undefined){
      return
    }

    try{
      await CouponService.create({
        code: code,
        store: store,
        creatorId: creator.id
      })
  
      setMessage("Creation Successful")

      setTimeout(()=>{
        window.location.href = "/coupons/search"
      },1300)
    }catch{
      setMessage("Creation Failed")
    }
  };


  return (
    <>
      <Toaster message={message}></Toaster>
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
    </>
  );
}

export default CouponForm;

const FormWrapper = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;
