import styled from "styled-components";
import { useState, useEffect } from "react";
import { getActivityLog } from "../API";
import Button from "../ReuseableComponents/Button";

const ReportWrapper = styled.div`
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

const InputWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 40px;
  border-radius: 10px;
  border: 2px solid #ddd;
  width: 90%;
  align-self: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10px;
`;

const TableWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 90%;
  border-radius: 10px;
  max-height: 300px;
  overflow: auto;
  border: 2px solid #ddd;
  align-self: center;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;
  max-height: 400px;
  overflow-y: auto;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const Form = styled.form`
  margin-top: 10px;
  width: 300px;
  display: flex;
  flex-direction: row;
  gap: 30px;

  label {
    color: white;
    display: block;
    margin-bottom: 10px;
  }

  input {
    border-radius: 10px;
    outline: none;
    border: 2px solid #ddd;
  }

  input:focus {
    border-color: #00bcd4; /* Change the border color when the input is in focus */
  }
`;

export function Report(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getActivityLog()
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ReportWrapper>
      <Title>Report</Title>
      <SubTitle>Generate Reports</SubTitle>
      <InputWrapper>
        <Form>
          <label>
            Start Date:
            <input type="number" />
          </label>
          <label>
            End Date:
            <input type="number" />
          </label>
        </Form>
        <ButtonWrapper>
          <Button width={"140px"} height={"40px"}>
            Generate
          </Button>
          <Button width={"140px"} height={"40px"}>
            Add Activity
          </Button>
        </ButtonWrapper>
      </InputWrapper>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Action</th>
              <th>Occured</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.acitivtyID}>
                <Td>{item.uid}</Td>
                <Td>{item.action}</Td>
                <Td>{item.occuredAt}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </ReportWrapper>
  );
}
