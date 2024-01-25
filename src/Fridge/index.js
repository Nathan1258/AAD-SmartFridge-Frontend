import styled from "styled-components";
import Button from "../ReuseableComponents/Button";
import {useState} from "react";
import css from "styled-components";

const FridgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0;
  position: relative;§
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
`

const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`
const Overlay = styled.div`
  display: ${props => (props.buttonState ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 998; 
`;

const AddDiv = styled.div`
  display: ${props => props.buttonState ? 'flex' : 'none'};
  width: 600px;
  height: 400px;
  background-color: lightblue;
  position: absolute;
  top: 100px;
  align-self: center;
  z-index: 999;
  border-radius: 10px;
  
`;

//Add Items Pop Up 
const AddComponent = ({ buttonState, AddButton }) => (
    
    <>
    <Overlay buttonState={buttonState}></Overlay>
    <AddDiv buttonState={buttonState}>

    </AddDiv>
    </>
    
);

export function Fridge() {
  const [buttonState, setState] = useState(false);

  function AddButton() {
    setState(!buttonState);
  }

  return (
    <FridgeWrapper>
      <Title>Access Fridge</Title>
      <SubTitle>Manage Items in Fridge</SubTitle>
      <AddComponent buttonState={buttonState} AddButton={AddButton} />
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Td>Name</Td>
              <Td>Expiry</Td>
              <Td>No.</Td>
              <Td>Courier</Td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>John Smith</Td>
              <Td>26/2/12</Td>
              <Td>38</Td>
              <Td>David Guy</Td>
            </tr>
          </tbody>
        </Table>
      </TableWrapper>
      <ButtonWrapper>
        <Button width={"140px"} backgroundcolor={"#61ff69"} onClick={AddButton}>Add Item</Button>
        <Button width={"140px"} backgroundcolor={"#ff6961"}>Remove Item</Button>
      </ButtonWrapper>
    </FridgeWrapper>
  );
}