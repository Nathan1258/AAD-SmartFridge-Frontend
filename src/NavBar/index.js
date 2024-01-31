import styled from "styled-components";
import { IoLogOut } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const NavBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NavTitle = styled.h1`
  padding-left: 20px;

  .ff {
    color: grey;
  }

  .smart {
    color: white;
  }
`;

const NavButtonsWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: row;
  justify-content: center;
`;

const LogoutWrapper = styled.div`
  display: flex;
  width: 150px;
  justify-content: center;
  margin-right: 15px;
  margin-left: 15px;
  flex-direction: row;
  align-items: center;
  transition: transform 250ms;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.125);
  border-radius: 10px;

  &:hover {
    transform: scale(1.05);
  }

  &:hover::after {
    transition: transform 250ms;
    transform: scale(1);
  }
`;
const LogoutText = styled.p`
  padding-left: 5px;
  color: white;
`;

const NotificationsWrapper = styled.div`
  display: flex;
  width: 150px;
  justify-content: center;
  margin-right: 15px;
  margin-left: 15px;
  flex-direction: row;
  align-items: center;
  transition: transform 250ms;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.125);
  border-radius: 10px;

  &:hover {
    transform: scale(1.05);
  }

  &:hover::after {
    transition: transform 250ms;
    transform: scale(1);
  }
`;
const NotificationsText = styled.p`
  padding-left: 5px;
  color: white;
`;

export function NavBar(props) {
  const { resetUserData } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    document.cookie = `accessPIN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    resetUserData();
    navigate("/clock-in");
  };
  const report = () => {
    navigate("/report");
  };

  return (
    <NavBarWrapper>
      <NavTitle>
        <span className="ff">FF</span>
        <span className="smart">smart.</span>
      </NavTitle>
      <NavButtonsWrapper>
        <NotificationsWrapper onClick={report}>
          <IoIosNotifications color="white" opacity={0.8} size={25} />
          <NotificationsText>Notifications</NotificationsText>
        </NotificationsWrapper>
        <LogoutWrapper onClick={logout}>
          <IoLogOut color="white" opacity={0.8} size={25} />
          <LogoutText>Logout</LogoutText>
        </LogoutWrapper>
      </NavButtonsWrapper>
    </NavBarWrapper>
  );
}
