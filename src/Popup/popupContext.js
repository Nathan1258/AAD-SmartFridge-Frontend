import React, { createContext, useState, useContext, useCallback } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupData, setPopupData] = useState({
    title: "",
    message: null,
    buttonText: "Okay",
    onButtonClick: () => {},
  });

  const clearPopup = () =>
    setPopupData({
      title: "",
      content: null,
      buttonText: "Okay",
      onButtonClick: () => {},
    });

  const triggerPopup = useCallback(
    (title, content, buttonText = "Okay", onButtonClick = () => {}) => {
      setPopupData({ title, content, buttonText, onButtonClick });
    },
    []
  );

  return (
    <PopupContext.Provider value={{ popupData, triggerPopup, clearPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
