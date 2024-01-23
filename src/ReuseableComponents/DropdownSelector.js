import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledSelect = styled.select`
  background-color: ${(props) => props.backgroundcolor || "white"};
  color: ${(props) => props.color || "black"};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
`;

const DropdownSelector = ({
  options,
  selectedOption,
  onChange,
  width,
  height,
  color,
  backgroundcolor,
}) => {
  return (
    <DropdownContainer>
      <StyledSelect
        value={selectedOption}
        onChange={onChange}
        width={width}
        height={height}
        color={color}
        backgroundcolor={backgroundcolor}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default DropdownSelector;
