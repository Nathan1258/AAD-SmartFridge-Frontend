import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background-color: ${(props) => props.backgroundColor || "rgba(255, 255, 255, 0.125)"};
  color: ${(props) => props.color || "white"};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  transition: transform 250ms;
  margin: ${(props) => props.margin || "0"};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;


  h1 {
    font-size: 25px;
    margin: 0px;
    margin-top: 10px;
    
  }

  

  &:hover {
    transform: scale(1.1);
  }

  &:hover::after {
    transition: transform 250ms;
    transform: scale(1);
  }
`;

const Overlay = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.15);
z-index: 999;
pointer-events: none; 
transition: opacity 0.3s ease;
border-radius: 20px;

${StyledCard}:hover & {
  opacity: 0;
}

`;

const DashboardCard = ({
  onClick,
  width,
  height,
  color,
  backgroundColor,
  margin,
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
      <Overlay/>
      {children}
    </StyledCard>
  );
};

export default DashboardCard;
