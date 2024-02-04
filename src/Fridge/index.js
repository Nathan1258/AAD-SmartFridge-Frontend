import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAllItemsInStock, insertItem, removeItem } from "../API";
import { Popup } from "../Popup/popup";
import { usePopup } from "../Popup/popupContext";
import AutocompleteInput from "../ReuseableComponents/AutocompleteInput";
import Counter from "../ReuseableComponents/Counter";

const FridgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0;
  position: relative;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  color: white;
`;

const SubTitle = styled.h4`
  margin: 0;
  padding-top: 10px;
  color: white;
`;

const FridgeContentWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function Fridge() {
  const { triggerPopup } = usePopup();
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    getAllItemsInStock().then((data) => {
      if (data.code === 200) {
        setItems(data.data);
      } else {
        triggerPopup(
          "Error getting items in the fridge",
          "We could not get the items from the fridge, please try again.",
        );
      }
    });
  };

  const updateSuggestions = (value) => {
    setInputValue(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = items.filter((item) =>
      item.Name.toLowerCase().includes(value.toLowerCase()),
    );
    setSuggestions(filteredSuggestions);
  };

  let originalQuantity = 0;
  let quantityLocal = 0;
  const handleQuantityChange = (newQuantity) => {
    quantityLocal = newQuantity;
  };

  return (
    <FridgeWrapper>
      <Title>Access Fridge</Title>
      <SubTitle>Add or remove items in Fridge</SubTitle>
      <FridgeContentWrapper>
        <AutocompleteInput
          placeholder={"Enter Item Name"}
          value={inputValue}
          setValue={updateSuggestions}
          suggestions={suggestions}
          onSelectSuggestion={(suggestion) => {
            originalQuantity = suggestion.quantity;
            quantityLocal = suggestion.quantity;
            triggerPopup(
              `Manage ${suggestion.Name}`,
              <Counter
                value={suggestion.quantity}
                onValueChange={handleQuantityChange}
              />,
              "Okay",
              async () => {
                if (originalQuantity > quantityLocal) {
                  await removeItem(
                    suggestion.itemID,
                    originalQuantity - quantityLocal,
                  );
                  getItems();
                } else {
                  await insertItem(
                    suggestion.itemID,
                    quantityLocal - originalQuantity,
                    formatDate(suggestion.expiryDate),
                  );
                  getItems();
                }
              },
            );
          }}
        />
      </FridgeContentWrapper>
    </FridgeWrapper>
  );
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().substr(-2);
  return `${day}-${month}-${year}`;
};
