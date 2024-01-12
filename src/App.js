import React, {useEffect} from "react";
import styled from "styled-components";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import {Home} from "./Home";
import {NoMatch} from "./NoMatch";
import {Login} from "./Login";


const AppContainer = styled.div`
    margin: 0;
    font-family: 'Roboto';
`;

function App() {
  useEffect(() => {
      // This will run when the site is loaded

    WebFont.load({
      google: {
        families: ['Roboto']
      }
    });
  }, []);

  return (
      <AppContainer>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
      </AppContainer>
  );
}

export default App;
