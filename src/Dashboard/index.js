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
  margin-top: 80px;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
`;

const Image = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 30px;
`;




export function Dashboard(props) {
  return (
    <DashboardWrapper>
      <Title>Dashboard</Title>
      <SubTitle>Welcome Back to Your Fridge</SubTitle>
      <CardsWrapper>
        <DashboardCard width={"330px"} height={"220px"} color={"white"} page={"/fridge"}>
          <h1>Access Fridge</h1>
          <Image src={photo}></Image>
        </DashboardCard>
        <DashboardCard
          width={"330px"}
          height={"220px"}
        >
          <h1>Delivery</h1>
          <Image src={photo}></Image>
        </DashboardCard>
        <DashboardCard width={"330px"} height={"220px"}>
          <h1>Health and Saftey</h1>
          <Image src={photo}></Image>
        </DashboardCard>
      </CardsWrapper>
    </DashboardWrapper>
  );
}
