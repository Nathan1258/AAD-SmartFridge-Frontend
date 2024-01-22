import React, {useEffect} from "react";
import styled from "styled-components";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import {Home} from "./Home";
import {NoMatch} from "./NoMatch";
import {ClockIn} from "./ClockIn";
import {Dashboard} from "./Dashboard";
import {PopupProvider, usePopup} from "./Popup/popupContext";
import Popup from "./Popup/popup";
import {Inventory} from "./Inventory";
import {NavBar} from "./NavBar";
import {SideBar} from "./SideBar";


const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100%;
    font-family: 'Rubik';
    background-image: linear-gradient(#0b132b, #1c2541, #00194A, #3a506b)
`;

const NavBarContainer = styled.div`
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    height: 10%;
`
const SideBarAndContentContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const SideBarContainer = styled.div`
    display: flex;
    padding-top: 20px;
    padding-right: 40px;
    padding-left: 20px;
    flex-direction: row;
    height: auto;
    width: auto;
`

const MainContentContainer = styled.div`
    flex-grow: 1;
    padding-left: 20px;
    padding-top: 20px;
    height: auto;
`

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
             <NavBarContainer>
                <NavBar/>
             </NavBarContainer>
            <SideBarAndContentContainer>
                <SideBarContainer>
                    <SideBar/>
                </SideBarContainer>
                <Popup />
                <MainContentContainer>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/inventory" element={<Inventory/>}/>
                            <Route path="/clock-in" element={<ClockIn />} />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </Router>
                </MainContentContainer>
            </SideBarAndContentContainer>
        </AppContainer>
    </PopupProvider>
  );
}

export default App;
