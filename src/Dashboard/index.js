import styled from "styled-components";
import DashboardCard from "../ReuseableComponents/DashboardCard";
import Button from "../ReuseableComponents/Button";
import photo from "../Resources/fridgephoto_svg.svg";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  color: white;
`;

const SubTitle = styled.h4`
  margin: 0;
  padding-top: 10px;
  color: white;
`;

const CardsWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
`;



export function Dashboard(props) {
  return (
    <DashboardWrapper>
      <Title>Dashboard</Title>
      <SubTitle>Welcome Back to Your Fridge</SubTitle>
      <CardsWrapper>
        <DashboardCard width={"300px"} height={"200px"} color={"white"}>
          <h1>Access Fridge</h1>
          <img src={photo}></img>
        </DashboardCard>
        <DashboardCard
          width={"300px"}
          height={"200px"}
          title={"Health and Saftey"}
        >
          <h1>Delivery</h1>
          <img src={photo}></img>
        </DashboardCard>
        <DashboardCard width={"300px"} height={"200px"}>
          <h1>Health and Saftey</h1>
          <img src={photo}></img>
        </DashboardCard>
      </CardsWrapper>
    </DashboardWrapper>
  );
}
