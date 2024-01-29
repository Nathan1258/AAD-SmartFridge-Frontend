import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background-color: ${(props) => props.backgroundColor || "#5C5C5C"};
  color: ${(props) => props.color || "white"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  transition: transform 250ms;
  margin: ${(props) => props.margin || "0"};
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 25px;
    margin: 0px;
    
  }

  &:hover {
    transform: scale(1.1);
  }

  &:hover::after {
    transition: transform 250ms;
    transform: scale(1);
  }
`;

const DashboardCard = ({
  onClick,
  width,
  height,
  color,
  backgroundColor,
  margin,
  title,
  children,
}) => {
  return (
    <StyledCard
      backgroundColor={backgroundColor}
      onClick={onClick}
      width={width}
      height={height}
      color={color}
      margin={margin}
    >
      {children}
    </StyledCard>
  );
};

export default DashboardCard;
