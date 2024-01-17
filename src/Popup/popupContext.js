import React, { createContext, useState, useContext } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
   const [popupData, setPopupData] = useState({
       title: '',
       message: '',
       buttonText: 'Okay',
       onButtonClick: () => {}
   });

   const clearPopup = () => setPopupData({ title: '', message: '', buttonText: 'Okay', onButtonClick: () => {} });

   const triggerPopup = (title, message, buttonText = 'Okay', onButtonClick = clearPopup) => {
       setPopupData({ title, message, buttonText, onButtonClick });
   };

   return (
     <PopupContext.Provider value={{ popupData, triggerPopup, clearPopup }}>
       {children}
     </PopupContext.Provider>
   );
}

export const usePopup = () => useContext(PopupContext);
