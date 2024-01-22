import React, { useEffect } from "react";
import styled from "styled-components";
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from "react-router-dom";
import WebFont from "webfontloader";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch";
import { ClockIn } from "./ClockIn";
import { Dashboard } from "./Dashboard";
import {PopupProvider, usePopup} from "./Popup/popupContext";
import Popup from "./Popup/popup";
import { Inventory } from "./Inventory";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import {UserProvider} from "./UserContext";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
  font-family: 'Rubik';
  background-image: linear-gradient(#0b132b, #1c2541, #00194A, #3a506b);
`;

const NavBarContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 10%;
`;

const SideBarAndContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideBarContainer = styled.div`
  display: flex;
  padding-top: 20px;
  padding-right: 40px;
  padding-left: 20px;
  flex-direction: row;
  height: auto;
  width: auto;
`;

const MainContentContainer = styled.div`
  flex-grow: 1;
  padding-left: 20px;
  padding-top: 20px;
  height: auto;
`;

function Layout({ children }) {
  return (
    <>
      <NavBarContainer>
        <NavBar />
      </NavBarContainer>
      <SideBarAndContentContainer>
        <SideBarContainer>
          <SideBar />
        </SideBarContainer>
        {children}
      </SideBarAndContentContainer>
    </>
  );
}

const Redirect = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const checkAccess = async () => {
    const hasAccess = await hasAccessPIN();
    if (!hasAccess) {
      navigate('/clock-in', { state: { showPopup: true, from: currentLocation.pathname} });
    }
  };

  useEffect(() => {
    checkAccess();
  }, [navigate, currentLocation]);

  return null;
};

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Rubik']
      }
    });
  }, []);
  return (
    <PopupProvider>
      <UserProvider>
        <AppContainer>
          <Popup/>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clock-in" element={<ClockIn />} />
              <Route
                path="*"
                element={
                <>
                  <Redirect/>
                  <Layout>
                    <MainContentContainer>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="*" element={<NoMatch />} />
                      </Routes>
                    </MainContentContainer>
                  </Layout>
                  </>
                }
              />
            </Routes>
          </Router>
        </AppContainer>
      </UserProvider>
    </PopupProvider>
  );
}

async function hasAccessPIN() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === 'accessPIN') {
      try {
        const response = await fetch("https://aad-api.ellisn.com/v1/users/verifyAccessToken", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "accessPIN": cookieValue })
        });
        const data = await response.json();
        return data.code === 200;
      } catch (error) {
        console.error(error)
        return false;
      }
    }
  }
  return false;
}


export default App;
