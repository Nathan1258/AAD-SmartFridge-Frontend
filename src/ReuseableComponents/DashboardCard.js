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

  &:hover {
    transform: scale(1.1);
  }

  &:hover::after {
    transition: transform 250ms;
    transform: scale(1);
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 30px;
  color: #ddd;
  font-size: 20px;
  background-color: #293039;
  border-radius: 5px;
`;

const CardHeader = ({ title }) => {
  return <StyledHeader>{title}</StyledHeader>;
};

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
      <CardHeader title={title}></CardHeader>
      {children}
    </StyledCard>
  );
};

export default DashboardCard;
