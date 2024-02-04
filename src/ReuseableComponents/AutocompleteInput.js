// Import necessary hooks and styles
import React, { useState } from "react";
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

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  position: absolute;
  width: calc(100% - 30px);
  z-index: 1000;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const AutocompleteInput = ({
  placeholder,
  value,
  setValue,
  width,
  height,
  margin,
  type,
  suggestions,
  onSelectSuggestion,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (item) => {
    setValue(item.Name);
    setShowSuggestions(false);
    onSelectSuggestion && onSelectSuggestion(item);
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        width={width}
        height={height}
        margin={margin}
        type={type ? type : "text"}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.Name}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </div>
  );
};

export default AutocompleteInput;
