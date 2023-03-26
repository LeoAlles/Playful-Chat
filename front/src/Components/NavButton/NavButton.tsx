import React from "react";
import styled from "styled-components";

type NavButtonProps = {
  link: string;
  children: string;
};

const NavButton: React.FC<NavButtonProps> = ({ link, children }) => {
  const handleClick = () => {
    window.location.href = link;
  };

  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
};

export default NavButton;

const StyledButton = styled.button`
  width: fit-content;
  padding: 0.5em;
  background-color: #E49393;
  border: 0;
  box-shadow: 5px 5px 0px #ccc;
  margin: 0.5em;
  font-weight: bold;
  font-size: 1em;
  border-radius: 5px;
  
  :hover{
      background-color: #C47373;
      box-shadow: none;
  }
`;

const Button = styled.button`
    width: fit-content;
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