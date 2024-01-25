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
`;

const Button = ({
  children,
  onClick,
  width,
  height,
  color,
  backgroundcolor,
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
    >
      {children}
    </StyledButton>
  );
};

export default Button;
