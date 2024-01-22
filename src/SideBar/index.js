import styled from "styled-components";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserContext";


const SideBarWrapper = styled.div`
`;

const SideBarLink = styled.h2`
    color: white;
    padding: 10px;
    cursor: pointer;
    
    &:hover{
         background: rgba(255, 255, 255, 0.125);
         padding: 10px;
         border-radius: 10px;
    }
`;

const UserBox = styled.div`
    color: white;
    text-align: left;
    background: rgba(255, 255, 255, 0.125);
    border-radius: 10px; 
    padding: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
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
`



export function SideBar(props) {
  const { userData, fetchUserData, resetUserData  }  = useUser();
  const navigate = useNavigate();

  const name = userData ? userData.first_name + " " + userData.last_name : "";
  const access = userData ? userData.access[0].toUpperCase() + userData.access.substring(1) : "";
  const isLoading = userData === null;
  fetchUserData();
  function handleClick(page) {
    navigate(page);
  }
  function logout() {
    document.cookie = `accessPIN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    resetUserData();
    navigate('clock-in');
  }

  return (
    <SideBarWrapper>
      <UserBox>
        {isLoading ? (
          <UserBoxName>Loading...</UserBoxName>
        ) : (
          <>
            <UserBoxName>{name}</UserBoxName>
            <UserBoxAccess>{access[0].toUpperCase() + access.substring(1)}</UserBoxAccess>
          </>
        )}
      </UserBox>
      <NavigationLinks>
        <SideBarLink onClick={() => handleClick("/dashboard")}>Dashboard</SideBarLink>
        <SideBarLink onClick={() => handleClick("/inventory")}>Inventory</SideBarLink>
        <SideBarLink onClick={() => handleClick("/order-management")}>Order Management</SideBarLink>
        <SideBarLink onClick={() => logout()}>Log out</SideBarLink>
      </NavigationLinks>
    </SideBarWrapper>
  );
}
