import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const CounterWrapper = styled.div`
  padding: 20px;
  text-align: center;
  align-items: center;
`;

const CounterButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  font-size: 15px;
  border: black;
  background: black;
  cursor: pointer;
  margin: 0 10px;
`;

const QuantityDisplay = styled.span`
  width: 50px;
  height: 50px;
  color: white;
  padding: 18px 25px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  border: black;
  background: black;
`;

const Counter = ({ value, onValueChange }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    onValueChange(localValue);
  }, [localValue, onValueChange]);

  const handleIncrement = () => {
    setLocalValue(localValue + 1);
  };

  const handleDecrement = () => {
    if (localValue >= 2) {
      setLocalValue(localValue - 1);
    }
  };

  return (
    <CounterWrapper>
      <CounterButton onClick={handleDecrement}>
        <FaMinus style={{ color: "white" }} />
      </CounterButton>
      <QuantityDisplay>{localValue}</QuantityDisplay>
      <CounterButton onClick={handleIncrement}>
        <FaPlus style={{ color: "white" }} />
      </CounterButton>
    </CounterWrapper>
  );
};

export default Counter;
