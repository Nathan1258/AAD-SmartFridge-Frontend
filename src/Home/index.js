import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../ReuseableComponents/Button";
import { useEffect } from "react";
import { hasAccessPIN } from "../Utils";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  margin: 0;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 5rem;
  color: white;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 10px;
  margin-bottom: 25px;
`;

const Line = styled.div`
  width: 25%;
  border-top: 3px solid #ffffff;
  border-radius: 5px;
  margin-right: 20px;
  margin-left: 20px;
`;

const Subtitle = styled.h2`
  margin: 0;
  font-size: 2.4rem;
  color: white;
`;

export function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (hasAccessPIN()) navigate("/dashboard");
  }, []);

  function handleClick() {
    navigate("/clock-in");
  }

  return (
    <HomeWrapper>
      <Title>Smart Fridge</Title>
      <SubtitleWrapper>
        <Line />
        <Subtitle>Eating done smarter</Subtitle>
        <Line />
      </SubtitleWrapper>
      <Button width={"150px"} height={"50px"} onClick={handleClick}>
        Clock In
      </Button>
    </HomeWrapper>
  );
}
