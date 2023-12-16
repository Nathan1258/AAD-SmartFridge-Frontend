import styled from "styled-components";

const AppContainer = styled.div
`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;

function App() {
  return (
      <AppContainer>
          <Title>Smart Fridge</Title>
      </AppContainer>
  );
}

export default App;
