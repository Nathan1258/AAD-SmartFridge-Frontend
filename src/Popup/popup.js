import React, { useEffect } from "react";
import styled from "styled-components";
import { usePopup } from "./popupContext";
import Button from "../ReuseableComponents/Button";
import { media } from "../Media";
import WebFont from "webfontloader";

const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  font-family: Rubik;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3000;
  background-color: white;
  border-radius: 10px;
  width: 30%;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  @media ${media.mobile} {
    width: 80%;
  }

  @media ${media.tablet} {
    width: 70%;
  }

  @media ${media.desktop} {
    width: 30%;
  }
`;

const Title = styled.h1``;
const Message = styled.p``;

const Popup = () => {
  const { popupData, clearPopup } = usePopup();

  const handleButtonClick = () => {
    popupData.onButtonClick();
    clearPopup();
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Rubik"],
      },
    });
  }, []);

  const renderContent = () => {
    if (React.isValidElement(popupData.content)) {
      return popupData.content;
    } else if (typeof popupData.content === "string") {
      return <Message>{popupData.content}</Message>;
    }
    return null;
  };

  return popupData.title || popupData.content ? (
    <StyledPopup>
      <Title>{popupData.title}</Title>
      {renderContent()}
      {popupData.buttonText === "null" ? (
        <></>
      ) : (
        <Button
          onClick={handleButtonClick}
          backgroundcolor={"black"}
          color={"white"}
        >
          {popupData.buttonText}
        </Button>
      )}
    </StyledPopup>
  ) : null;
};

export default Popup;
