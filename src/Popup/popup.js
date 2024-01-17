import React from 'react';
import styled from 'styled-components';
import { usePopup } from './popupContext';
import Button from "../ReuseableComponents/Button";

const StyledPopup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: white; 
    border-radius: 10px;
    width: 30%;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1``;
const Message = styled.p``;


const Popup = () => {
  const { popupData, clearPopup } = usePopup();

  const handleButtonClick = () => {
    popupData.onButtonClick();
    clearPopup();
  };

  return popupData.title || popupData.message ? (
    <StyledPopup>
        <Title>{popupData.title}</Title>
        <Message>{popupData.message}</Message>
        <Button onClick={handleButtonClick}>{popupData.buttonText}</Button>
    </StyledPopup>
  ) : null;
}

export default Popup;
