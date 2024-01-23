import styled from "styled-components";

const FridgeWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  margin: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  color: white;
`;

export function Fridge(props) {
  return (
    <FridgeWrapper>
      <Title>MATTY DO YOUR THING HERE</Title>
    </FridgeWrapper>
  );
}
