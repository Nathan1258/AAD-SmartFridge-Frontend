import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundcolor || "white"};
  color: ${(props) => props.color || "black"};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: ${(props) =>
    props.shadow ? "0px 4px 8px rgba(0, 0, 0, 0.5)" : "none"};
  margin: 5px;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  transition: transform 250ms;
  margin: ${(props) => props.margin || "0"};

  &:hover {
    transform: scale(1.1);
  }

  &:hover::after {
    transition: transform 250ms;
    transform: scale(1);
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const Button = ({
  children,
  onClick,
  width,
  height,
  color,
  backgroundcolor,
  isDisabled = false,
  shadow = false,
  margin,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      width={width}
      height={height}
      color={color}
      backgroundcolor={backgroundcolor}
      margin={margin}
      shadow={shadow}
      disabled={isDisabled}
      isDisabled={isDisabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
