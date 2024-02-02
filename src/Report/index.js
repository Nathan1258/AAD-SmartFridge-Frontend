import styled from "styled-components";
import { useState, useEffect } from "react";
import { getActivityLog, logAction } from "../API";
import Button from "../ReuseableComponents/Button";
import { Popup, PopupProvider } from "../Popup/popup";
import { usePopup } from "../Popup/popupContext";

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
    border-color: #00bcd4;
  }
`;

const ActivityForm = styled.form`
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
  top: 25%;
`;

const AddActivityComponent = ({
  overlayState,
  addActivity,
  addButtonState,
  updateTable,
}) => {
  const [action, setAction] = useState("");
  const [uid, setUid] = useState();
  const { triggerPopup } = usePopup();

  const handleAddAction = ({}) => {
    if (!action.trim()) {
      triggerPopup("Error", "Action cannot be empty", "Close");
      return;
    }

    if (uid.trim() !== "" && !Number.isInteger(parseInt(uid))) {
      triggerPopup("Error", "User ID must be a valid integer", "Close");
      return;
    }

    logAction(action, uid)
      .then((data) => {
        console.log("Action logged successfully:", data);
        triggerPopup(
          "Action Logged",
          "You have successfully logged an action",
          "Close"
        );
        setUid("");
        setAction("");
        updateTable();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        triggerPopup("Error", error, "Close");
      });
  };

  return (
    <>
      <Overlay overlayState={overlayState}></Overlay>
      <AddDiv addButtonState={addButtonState}>
        <Button alignSelf={"flex-end"} width={"90px"} onClick={addActivity}>
          Close
        </Button>
        <ActivityForm>
          <label>
            Action:
            <input
              style={{
                height: "30px",
                overflowY: "scroll",
              }}
              type="textarea"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
          </label>
          <label>
            User ID (Optional):
            <input
              type="number"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
          </label>
        </ActivityForm>
        <Button
          alignSelf={"center"}
          width={"140px"}
          backgroundcolor={"#61ff69"}
          onClick={handleAddAction}
        >
          Log Action
        </Button>
      </AddDiv>
    </>
  );
};

export function Report(props) {
  const [items, setItems] = useState([]);
  const [dateStart, setStartDate] = useState();
  const [dateEnd, setEndDate] = useState();
  const [overlayState, setOverlay] = useState(false);
  const [addButtonState, setState] = useState(false);

  const updateTable = async () => {
    try {
      const data = await getActivityLog(dateStart, dateEnd);
      setItems(data);
    } catch (error) {
      console.error("Error fetching test activity log:", error);
    }
  };

  const addActivity = () => {
    setState(!addButtonState);
    setOverlay(!overlayState);
    return;
  };

  return (
    <ReportWrapper>
      <Title>Report</Title>
      <SubTitle>Generate Reports</SubTitle>
      <AddActivityComponent
        addButtonState={addButtonState}
        addActivity={addActivity}
        overlayState={overlayState}
        updateTable={updateTable}
      />
      <InputWrapper>
        <Form>
          <label>
            Start Date:
            <input
              type="number"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input type="number" onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </Form>
        <ButtonWrapper>
          <Button width={"140px"} height={"40px"} onClick={updateTable}>
            Generate
          </Button>
          <Button width={"140px"} height={"40px"} onClick={addActivity}>
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
