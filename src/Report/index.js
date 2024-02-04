import styled from "styled-components";
import { useState, useEffect } from "react";
import { getActivityLog, logAction, logActionNoUID } from "../API";
import Button from "../ReuseableComponents/Button";
import { Popup, PopupProvider } from "../Popup/popup";
import { usePopup } from "../Popup/popupContext";
import DropdownSelector from "../ReuseableComponents/DropdownSelector";
import Input from "../ReuseableComponents/Input";

const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  color: white;
`;

const SubTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 10px;
  color: white;
`;

const NotificationsTodayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: auto;
  justify-content: space-between;
  margin: 20px;
  background: rgba(255, 255, 255, 0.125);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

const CustomNotificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;
  border-spacing: 0;
  border-radius: 10px;
  overflow: visible;
  margin-top: 15px;

  th,
  td {
    padding: 8px;
    text-align: left;
  }

  th {
    background: #2c3f56;
    color: white;
    cursor: pointer;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .firstHeader {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .itemRow {
    &:hover {
      background: rgba(255, 255, 255, 0.5);
      color: black;
    }
  }

  td {
    padding: 15px;
  }
`;
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const DateFiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 50px;
`;

const DateRange = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
  margin-left: 20px;
`;

export function Report(props) {
  const [todayNotifications, setTodayNotifications] = useState([]);
  const [customRangeNotification, setCustomRangeNotifications] = useState([]);
  const [startDate, setStartDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [endDate, setEndDate] = useState(today);

  const [uid, setUID] = useState("");
  const [action, setAction] = useState("");
  const now = new Date();
  const startDateNow =
    new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
  const endDateNow =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    ).getTime() / 1000;

  const { triggerPopup } = usePopup();

  useEffect(() => {
    getTodayActivityLog();
  }, []);

  const getTodayActivityLog = () => {
    getActivityLog(startDateNow, endDateNow).then((data) => {
      if (data.code === 200) {
        setTodayNotifications(data.data);
      } else {
        triggerPopup(
          "Unable to get notifications",
          "An error occurred fetching today's notifications. Please try again",
        );
      }
    });
  };

  const handleGeneration = () => {
    if (!startDate || !endDate) {
      triggerPopup(
        "You need to fill in both dates",
        "You need to enter both range dates to generate a report.",
      );
      return;
    }
    const startDateD = new Date(startDate);
    const endDateD = new Date(endDate);
    const startDateTS = Math.floor(startDateD.getTime() / 1000);
    const endDateTS = Math.floor(endDateD.getTime() / 1000);
    getActivityLog(startDateTS, endDateTS)
      .then((data) => {
        if (data.code === 200) {
          console.log(data.data);
          setCustomRangeNotifications(data.data);
        } else {
          triggerPopup(
            "Unable to get notifications",
            "An error occurred fetching notifications for given date range. Please try again",
          );
        }
      })
      .catch((error) => {
        triggerPopup(
          "Unable to get notifications",
          "An error occurred fetching notifications for given date range. Please try again",
        );
      });
  };

  const handleSave = () => {
    if (!action) {
      triggerPopup(
        "You need to fill out an action",
        "You need to enter a action to be added ",
      );
    }
    if (!uid) {
      logActionNoUID(action)
        .then((data) => {
          if (data.code === 200) {
            triggerPopup(
              "Action saved",
              "Your action has been saved",
              "Okay",
              () => {
                getTodayActivityLog();
              },
            );
          } else {
            triggerPopup(
              "Action couldn't be saved",
              "There was an issue saving your action. Please try again later.",
            );
          }
        })
        .catch((error) => {
          triggerPopup(
            "Action couldn't be saved",
            "There was an issue saving your action. Please try again later.",
          );
        });
    } else {
      logAction(action, uid)
        .then((data) => {
          if (data.code === 200) {
            triggerPopup("Action saved", "Your action has been saved");
          } else {
            triggerPopup(
              "Action couldn't be saved",
              "There was an issue saving your action. Please try again later.",
            );
          }
        })
        .catch((error) => {
          triggerPopup(
            "Action couldn't be saved",
            "There was an issue saving your action. Please try again later.",
          );
        });
    }
  };

  return (
    <ReportWrapper>
      <Title>Notifications</Title>
      <SubTitle>View notifications and generate Reports</SubTitle>
      <Title style={{ marginTop: "15px" }}>Notifications today</Title>
      <NotificationsTodayWrapper>
        <TableContainer>
          <Table>
            <thead>
              <tr className="header">
                <th className={"firstHeader"}>Notification</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {todayNotifications.map((notification) => (
                <tr key={notification.activityID}>
                  <td>
                    {notification.uid === "System"
                      ? "System"
                      : "User ID " + notification.uid}
                    : {notification.action}
                  </td>
                  <td>{formatDateToReadable(notification.occuredAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </NotificationsTodayWrapper>
      <Title>Manually add a notification/action</Title>
      <DateFiltersWrapper>
        <DateRange>
          <SubTitle>User ID:</SubTitle>
          <Input
            margin={"0"}
            placeholder={"User ID (Optional)"}
            width={"250px"}
            value={uid}
            setValue={setUID}
          ></Input>
        </DateRange>
        <DateRange>
          <SubTitle>Action:</SubTitle>
          <Input
            margin={"0"}
            placeholder={"Action"}
            width={"400px"}
            value={action}
            setValue={setAction}
          ></Input>
        </DateRange>
        <DateRange>
          <SubTitle style={{ opacity: "0" }}>Placeholder</SubTitle>
          <Button width={"250px"} height={"50px"} onClick={handleSave}>
            Save Action
          </Button>
        </DateRange>
      </DateFiltersWrapper>

      <Title>Generate notifications report</Title>
      <DateFiltersWrapper>
        <DateRange>
          <SubTitle>Start Date:</SubTitle>
          <Input
            type={"date"}
            margin={"0"}
            placeholder={"Start Date"}
            width={"250px"}
            value={startDate}
            setValue={setStartDate}
          ></Input>
        </DateRange>
        <DateRange>
          <SubTitle>End Date:</SubTitle>
          <Input
            type={"date"}
            margin={"0"}
            placeholder={"End Date"}
            width={"250px"}
            value={endDate}
            setValue={setEndDate}
          ></Input>
        </DateRange>
        <DateRange>
          <SubTitle style={{ opacity: "0" }}>Placeholder</SubTitle>
          <Button width={"250px"} height={"50px"} onClick={handleGeneration}>
            Generate
          </Button>
        </DateRange>
      </DateFiltersWrapper>
      {startDate === "" ? (
        <SubTitle>Enter valid date ranges to continue</SubTitle>
      ) : startDate !== "" &&
        endDate !== "" &&
        (!customRangeNotification || customRangeNotification.length === 0) ? (
        <SubTitle>No notifications match your date range.</SubTitle>
      ) : startDate !== "" &&
        endDate !== "" &&
        customRangeNotification &&
        customRangeNotification.length > 0 ? (
        <NotificationsTodayWrapper>
          <TableContainer>
            <Table>
              <thead>
                <tr className="header">
                  <th className={"firstHeader"}>Notification</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {customRangeNotification.map((notification) => (
                  <tr key={notification.activityID}>
                    <td>
                      {notification.uid === "System"
                        ? "System"
                        : "User ID " + notification.uid}
                      : {notification.action}: {notification.action}
                    </td>
                    <td>{formatDateToReadable(notification.occuredAt)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </NotificationsTodayWrapper>
      ) : null}
    </ReportWrapper>
  );
}

export function formatDateToReadable(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daySuffix = getDaySuffix(day);
  const formattedDate = `${day}${daySuffix}  ${months[monthIndex]}  ${year} at ${hour}:${minutes}`;
  return `${formattedDate}`;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
