import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const SideBarWrapper = styled.div``;

const SideBarLink = styled.h2`
  color: white;
  padding: 10px;
  cursor: pointer;
  transition: transform 250ms;
  background: ${(props) =>
    props.current ? "rgba(255, 255, 255, 0.125)" : "none"};
  border-radius: ${(props) => (props.current ? "10px" : "0")};

  &:hover {
    transform: scale(1.05);
  }

  &:hover::after {
    transition: transform 250ms;
    transform: scale(1);
  }
`;

const UserBox = styled.div`
  color: white;
  text-align: left;
  background: rgba(255, 255, 255, 0.125);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  margin-bottom: 20px;
`;
const UserBoxName = styled.h1`
  margin: 0;
`;
const UserBoxAccess = styled.p`
  margin: 0;
`;

const NavigationLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export function SideBar(props) {
  const { userData, fetchUserData, resetUserData } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const name = userData ? userData.first_name + " " + userData.last_name : "";
  const access = userData
    ? userData.access[0].toUpperCase() + userData.access.substring(1)
    : "";
  const isLoading = userData === null;

  useEffect(() => {
    fetchUserData();
  }, []);

  function handleClick(page) {
    navigate(page);
  }

  return (
    <SideBarWrapper>
      <UserBox>
        {isLoading ? (
          <UserBoxName>Loading...</UserBoxName>
        ) : (
          <>
            <UserBoxName>{name}</UserBoxName>
            <UserBoxAccess>
              {access[0].toUpperCase() + access.substring(1)}
            </UserBoxAccess>
          </>
        )}
      </UserBox>
      <NavigationLinks>
        <SideBarLink
          current={location.pathname === "/dashboard"}
          onClick={() => handleClick("/dashboard")}
        >
          Dashboard
        </SideBarLink>
        <SideBarLink
          current={location.pathname === "/inventory"}
          onClick={() => handleClick("/inventory")}
        >
          Inventory
        </SideBarLink>
        <SideBarLink
          current={location.pathname === "/fridge"}
          onClick={() => handleClick("/fridge")}
        >
          Access Fridge
        </SideBarLink>
        <SideBarLink
          current={location.pathname === "/order-management"}
          onClick={() => handleClick("/order-management")}
        >
          Order Management
        </SideBarLink>
        {access.toLowerCase() === "admin" && (
          <>
            <SideBarLink
              access={access}
              current={location.pathname === "/expiring"}
              onClick={() => handleClick("/expiring")}
            >
              Expiring items
            </SideBarLink>
            <SideBarLink
              access={access}
              current={location.pathname === "/admin"}
              onClick={() => handleClick("/admin")}
            >
              Admin tools
            </SideBarLink>
          </>
        )}
      </NavigationLinks>
    </SideBarWrapper>
  );
}
