import React, { useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import WebFont from "webfontloader";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch";
import { ClockIn } from "./ClockIn";
import { Dashboard } from "./Dashboard";
import { PopupProvider, usePopup } from "./Popup/popupContext";
import Popup from "./Popup/popup";
import { Inventory } from "./Inventory";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import { UserProvider, useUser } from "./UserContext";
import { hasAccessPIN } from "./Utils";
import { Fridge } from "./Fridge";
import { Admin } from "./Admin";
import { Expiring } from "./Expiring";
import { OrderManagement } from "./OrderManagement";
import { useState } from "react";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
  font-family: "Rubik";
  background-color: ${(props) => (props.isBackgroundChanged ? "black" : "")};
  background-image: ${(props) =>
    props.isBackgroundChanged
      ? ""
      : "linear-gradient(#0b132b, #1c2541, #00194a, #3a506b)"};
`;

const NavBarContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 10%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
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
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const MainContentContainer = styled.div`
  flex-grow: 1;
  padding-left: 20px;
  padding-top: 20px;
  height: auto;
`;

function Layout({ children, handleBackgroundChange }) {
  return (
    <>
      <NavBarContainer>
        <NavBar onBackgroundChange={handleBackgroundChange} />
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
      navigate("/clock-in", {
        state: { showPopup: true, from: currentLocation.pathname },
      });
    }
  };

  useEffect(() => {
    checkAccess();
  }, [navigate, currentLocation]);

  return null;
};

function App() {
  const [isBackgroundChanged, setBackgroundChanged] = useState(false);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Rubik"],
      },
    });
  }, []);

  const handleBackgroundChange = () => {
    setBackgroundChanged(!isBackgroundChanged);
  };
  return (
    <PopupProvider>
      <UserProvider>
        <AppContainer isBackgroundChanged={isBackgroundChanged}>
          <Popup />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clock-in" element={<ClockIn />} />
              <Route
                path="*"
                element={
                  <>
                    <Redirect />
                    <Layout handleBackgroundChange={handleBackgroundChange}>
                      <MainContentContainer>
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/inventory" element={<Inventory />} />
                          <Route path="/fridge" element={<Fridge />} />
                          <Route path="/admin" element={<Admin />} />
                          <Route path="/expiring" element={<Expiring />} />
                          <Route
                            path="/order-management"
                            element={<OrderManagement />}
                          />
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

export default App;
