import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #008cba;
  color: white;
  padding: 1em;
  border: none;
  border-radius: 5px;
  margin: 1em;
  cursor: pointer;

  &:hover {
    background-color: #005f81;
  }
`;

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