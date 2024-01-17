import React, {useEffect} from "react";
import styled from "styled-components";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import {Home} from "./Home";
import {NoMatch} from "./NoMatch";
import {ClockIn} from "./ClockIn";
import {PopupProvider, usePopup} from "./Popup/popupContext";
import Popup from "./Popup/popup";


const AppContainer = styled.div`
    margin: 0;
    font-family: 'Rubik';
`;

function App() {
  useEffect(() => {
      // This will run when the site is loaded
    WebFont.load({
      google: {
        families: ['Rubik']
      }
    });
  }, []);

  return (
    <PopupProvider>
        <AppContainer>
            <Popup />
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clock-in" element={<ClockIn />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
        </AppContainer>
    </PopupProvider>
  );
}

export default App;
