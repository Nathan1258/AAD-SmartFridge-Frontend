import styled from "styled-components";
import {useEffect} from "react";
import WebFont from "webfontloader";

const AppContainer = styled.div
`
  display: flex;
  height: 100vh;
  font-family: 'Roboto';
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;


function App() {

     useEffect(() => {
   WebFont.load({
     google: {
       families: ['Roboto']
     }
   });
  }, []);

  return (
      <AppContainer>
          <Title>Smart Fridge</Title>
      </AppContainer>
  );
}

export default App;
