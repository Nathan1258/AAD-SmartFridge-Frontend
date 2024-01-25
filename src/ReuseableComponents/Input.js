import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: white;
  color: black;
  border: none;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  margin: 5px;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.margin || "15px"};
`;

const Input = ({ placeholder, value, setValue, width, height, margin }) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      width={width}
      height={height}
      margin={margin}
    />
  );
};

export default Input;
