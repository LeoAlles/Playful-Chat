import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type props = {
    message: string
}

function Toaster({ message }: props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [message]);

  return (
    <ToasterContainer className={isVisible ? 'visible' : ''}>
      <ToasterMessage>{message}</ToasterMessage>
    </ToasterContainer>
  );
}

export default Toaster;

const ToasterContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
  transition: all 0.5s ease-in-out;
  opacity: 0;

  &.visible {
    opacity: 1;
  }
`;

const ToasterMessage = styled.div`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;
