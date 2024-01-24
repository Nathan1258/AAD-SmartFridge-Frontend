import styled from "styled-components";
import Button from "../ReuseableComponents/Button";

const FridgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0;
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
`;




export function Fridge() {


  return (
    <FridgeWrapper>
      <Title>Access Fridge</Title>
      <SubTitle>Manage Items in Fridge</SubTitle>
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
      <Button width={"140px"} backgroundcolor={"#61ff69"}>Add Item</Button>
        <Button width={"140px"} backgroundcolor={"#ff6961"}>Remove Item</Button>
      </ButtonWrapper>
    </FridgeWrapper>
  );
}
