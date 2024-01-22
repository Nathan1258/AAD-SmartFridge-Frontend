import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const resetUserData = () => {
    setUserData(null);
  };

  const fetchUserData = async() => {

      if(getAccessPIN() != "") {
        try {
          const response = await fetch("https://aad-api.ellisn.com/v1/users/details", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"accessPIN": getAccessPIN()})
          });
          if (!response.ok) throw new Error("Failed to fetch user data");
          const fetchedUserData = await response.json();
          setUserData(fetchedUserData.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  },[userData]);

 return (
    <UserContext.Provider value={{ userData, resetUserData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}

function getAccessPIN() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === 'accessPIN') {
      return cookieValue;
    }
  }
  return "";
}

export function useUser() {
  return useContext(UserContext);
}

