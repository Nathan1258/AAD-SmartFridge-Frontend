import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetails } from "./API";
import {getAccessPIN} from "./Utils";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const resetUserData = () => {
    setUserData(null);
  };

  const fetchUserData = async () => {
    const accessPIN = getAccessPIN();
    if (accessPIN) {
      try {
        const data = await getUserDetails(accessPIN);
        setUserData(data);
      } catch (error) {
        console.error(error);
        document.cookie = `accessPIN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        resetUserData();
      }
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, []); // Dependencies array is empty, this runs once after component mounts

  return (
    <UserContext.Provider value={{ userData, resetUserData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
