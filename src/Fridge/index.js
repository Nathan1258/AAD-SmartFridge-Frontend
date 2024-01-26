import styled from "styled-components";
import Button from "../ReuseableComponents/Button";
import { useState, useEffect } from "react";
import { getAllItems, getAllItemsInStock, insertItem } from "../API";
import { formatDateToReadable } from "../Inventory/index";

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

const TableWrapper = styled.div`
  display: flex;
  margin-top: 70px;
  width: 90%;
  border-radius: 10px;
  max-height: 400px;
  overflow: auto;
  border: 2px solid #ddd;
  align-self: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;
  table-layout: fixed;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Overlay = styled.div`
  display: ${(props) => (props.overlayState ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const AddDiv = styled.div`
  display: ${(props) => (props.addButtonState ? "flex" : "none")};
  flex-direction: column;
  width: 600px;
  height: 400px;
  background-color: #29323f;
  position: absolute;
  top: 100px;
  align-self: center;
  z-index: 999;
  border-radius: 10px;
  padding: 15px;
`;

const RemoveDiv = styled.div`
  display: ${(props) => (props.removeButtonState ? "flex" : "none")};
  flex-direction: column;
  width: 600px;
  height: 400px;
  background-color: #29323f;
  position: absolute;
  top: 100px;
  align-self: center;
  z-index: 999;
  border-radius: 10px;
  padding: 15px;
`;

const Form = styled.form`
  margin-top: 10px;
  align-self: center;
  width: 300px;

  label {
    color: white;
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    height: 15px;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: 10px;
    outline: none;
    border: 2px solid #ddd;
  }

  input:focus {
    border-color: #00bcd4; /* Change the border color when the input is in focus */
  }
`;

function ItemForm({ setItemID, setQuantity, setExpiryDate }) {
  return (
    <Form>
      <label>
        Item:
        <input type="number" onChange={(e) => setItemID(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <label>
        Expiry Date:
        <input type="text" onChange={(e) => setExpiryDate(e.target.value)} />
      </label>
    </Form>
  );
}

const AddComponent = ({ addButtonState, AddButton, overlayState }) => {
  const [itemID, setItemID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleAddItem = () => {
    // Call the insertItem method with form data
    insertItem(itemID, quantity, expiryDate)
      .then((data) => {
        console.log("Item added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        console.error("Test");
      });
  };

  return (
    <>
      <Overlay overlayState={overlayState}></Overlay>
      <AddDiv addButtonState={addButtonState}>
        <Button alignSelf={"flex-end"} width={"90px"} onClick={AddButton}>
          Close
        </Button>
        <ItemForm
          setItemID={setItemID}
          setQuantity={setQuantity}
          setExpiryDate={setExpiryDate}
        />
        <Button
          alignSelf={"center"}
          width={"140px"}
          backgroundcolor={"#61ff69"}
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </AddDiv>
    </>
  );
};

// Remove Items
const RemoveComponent = ({ removeButtonState, RemoveButton, overlayState }) => (
  <>
    <Overlay overlayState={overlayState}></Overlay>
    <RemoveDiv removeButtonState={removeButtonState}>
      <Button alignSelf={"flex-end"} width={"90px"} onClick={RemoveButton}>
        Close
      </Button>
      <Button alignSelf={"center"} width={"140px"} backgroundcolor={"#ff6961"}>
        Remove Item
      </Button>
    </RemoveDiv>
  </>
);

export function Fridge() {
  const [addButtonState, setState] = useState(false);
  const [removeButtonState, setRemoveState] = useState(false);
  const [overlayState, setOverlay] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    getAllItemsInStock()
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  function AddButton() {
    setState(!addButtonState);
    setOverlay(!overlayState);
  }

  function RemoveButton() {
    setRemoveState(!removeButtonState);
    setOverlay(!overlayState);
  }

  return (
    <FridgeWrapper>
      <Title>Access Fridge</Title>
      <SubTitle>Manage Items in Fridge</SubTitle>
      <AddComponent
        addButtonState={addButtonState}
        AddButton={AddButton}
        overlayState={overlayState}
      />
      <RemoveComponent
        removeButtonState={removeButtonState}
        RemoveButton={RemoveButton}
      ></RemoveComponent>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Product Price</th>
              <th>Last Updated</th>
              {/* Add more table headers based on your data structure */}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.productID}>
                <Td>{item.Name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{formatDateToReadable(item.expiryDate)}</Td>
                <Td>{item.Price}</Td>
                <Td>{formatDateToReadable(item.lastUpdated)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <ButtonWrapper>
        <Button width={"140px"} backgroundcolor={"#61ff69"} onClick={AddButton}>
          Add Item
        </Button>
        <Button
          width={"140px"}
          backgroundcolor={"#ff6961"}
          onClick={RemoveButton}
        >
          Remove Item
        </Button>
      </ButtonWrapper>
    </FridgeWrapper>
  );
}
