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
  margin: ${(props) => props.margin || "0"};
`;

const DropdownSelector = ({
  uid,
  options,
  selectedOption,
  onChange,
  width,
  height,
  color,
  backgroundcolor,
  margin,
}) => {
  return (
    <DropdownContainer>
      <StyledSelect
        value={selectedOption}
        onChange={(event) => onChange(event, uid)}
        width={width}
        height={height}
        color={color}
        backgroundcolor={backgroundcolor}
        margin={margin}
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
