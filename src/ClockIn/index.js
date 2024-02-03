import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ReuseableComponents/Button";
import Input from "../ReuseableComponents/Input";
import { useEffect, useState } from "react";
import { usePopup } from "../Popup/popupContext";
import { useUser } from "../UserContext";
import { clockIn, verifyPIN } from "../API";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  margin: 0;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 5rem;
  color: white;
  padding: 20px;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 30px;
  margin-bottom: 25px;
`;

const Line = styled.div`
  width: 25%;
  border-top: 3px solid #ffffff;
  border-radius: 5px;
  margin-right: 20px;
  margin-left: 20px;
`;

const Subtitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2.4rem;
  color: white;
  padding: 20px;
`;

export function ClockIn(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { triggerPopup } = usePopup();

  const [userNumber, setUserNumber] = useState("");
  const [password, setPassword] = useState("");
  const [accessPIN, setAccessPIN] = useState("");

  useEffect(() => {
    if (location.state?.showPopup) {
      triggerPopup(
        "Access Denied",
        "You need to clock in and use today's access PIN before accessing this page.",
        "Okay",
      );
    }
  }, [location, triggerPopup]);

  const redirectBack = () => {
    const from = location.state?.from || "/app/dashboard";
    navigate(from);
  };

  function handleClockIn() {
    clockIn(userNumber, password)
      .then((accessPIN) => {
        document.cookie = "accessPIN=" + accessPIN + ";path=/";
        triggerPopup(
          "Clocked in",
          "You've successfully clocked in. Your PIN for the day is: " +
            accessPIN,
          "Okay",
          () => redirectBack(),
        );
      })
      .catch((errorMessage) => {
        triggerPopup("Ooops...", errorMessage, "Okay");
      });
  }

  function handleLogIn() {
    verifyPIN(accessPIN)
      .then((response) => {
        console.log(response);
        if (response.data) {
          document.cookie =
            "accessCode=" + response.data.accessCode + ";path=/";
          navigate("/delivery", { state: { data: response.data } });
        } else {
          document.cookie = "accessPIN=" + response + ";path=/";
          redirectBack();
        }
      })
      .catch((errorMessage) => {
        triggerPopup("Ooops...", errorMessage, "Okay");
      });
  }

  return (
    <HomeWrapper>
      <Subtitle>Clock In</Subtitle>
      <Input
        width={"250px"}
        name="userNumber"
        value={userNumber}
        setValue={setUserNumber}
        placeholder={"User Number"}
      />
      <Input
        width={"250px"}
        name="password"
        value={password}
        setValue={setPassword}
        placeholder={"Password"}
        type={"password"}
      />
      <Button width={"150px"} height={"50px"} onClick={handleClockIn}>
        Clock In
      </Button>
      <SubtitleWrapper>
        <Line />
        <Subtitle>Or</Subtitle>
        <Line />
      </SubtitleWrapper>
      <Subtitle>Log in</Subtitle>
      <p style={{ color: "white", margin: "0" }}>
        Please enter your access code here if you are a delivery driver
      </p>
      <Input
        width={"250px"}
        name="accessPIN"
        value={accessPIN}
        setValue={setAccessPIN}
        placeholder={"Access PIN"}
      />
      <Button width={"150px"} height={"50px"} onClick={handleLogIn}>
        Log in
      </Button>
    </HomeWrapper>
  );
}
