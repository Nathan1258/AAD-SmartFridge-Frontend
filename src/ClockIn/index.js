import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../ReuseableComponents/Button"
import Input from "../ReuseableComponents/Input";
import {useEffect, useState} from "react";
import {usePopup} from "../Popup/popupContext";
import {useUser} from "../UserContext";


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
`

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


export function ClockIn(props){

    const location = useLocation();
    const {fetchUserData} = useUser();
    const navigate = useNavigate();
    const {triggerPopup} = usePopup();

    const [userNumber, setUserNumber] = useState('');
    const [password, setPassword] = useState('');
    const [accessPIN, setAccessPIN] = useState('');

    useEffect(() => {
        if (location.state?.showPopup) {
          triggerPopup(
            "Access Denied",
            "You need to clock in and use today's access PIN before accessing this page.",
            "Okay"
          );
        }
    }, [location, triggerPopup]);


    const redirectBack = () => {
      const from = location.state?.from || '/dashboard';
      console.log(from);
      navigate(from);
    };

    function handleClockIn() {
        fetch("https://aad-api.ellisn.com/v1/users/clock-in", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uid": userNumber, "password": password })
    })
    .then(response => response.json())
    .then(data => {
        if(data.code != 200) return triggerPopup("Ooops...", "Your user number or password is wrong. Please try again.", "Okay");
        document.cookie = "accessPIN=" + data.data.accessPIN + ";path=/";
        // if(location.state?.showPopup)
        triggerPopup("Clocked in", "You've successfully clocked in. Your PIN for the day is: " + data.data.accessPIN, "Okay", () => redirectBack())
    }).catch(error => console.error('Error:', error));
    }

    function handleLogIn(){
        fetch("https://aad-api.ellisn.com/v1/users/verifyAccessToken", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "accessPIN": accessPIN})
    })
    .then(response => response.json())
    .then(data => {
        if(data.code != 200) return triggerPopup("Ooops...", "Your accessPIN is wrong or has expired. Please try again.", "Okay");
        document.cookie = "accessPIN=" + accessPIN + ";path=/";
        redirectBack();
        // triggerPopup("Clocked in", "You've successfully logged in.", "Okay", () => redirectBack());
    }).catch(error => console.error('Error:', error));
    }

    return (
        <HomeWrapper>
            <Subtitle>Clock In</Subtitle>
            <Input width={"250px"} name="userNumber" value={userNumber} setValue={setUserNumber} placeholder={"User Number"}/>
            <Input width={"250px"} name="password" value={password} setValue={setPassword} placeholder={"Password"}/>
            <Button width={"150px"} height={"50px"} onClick={handleClockIn}>Clock In</Button>
            <SubtitleWrapper>
                <Line />
                    <Subtitle>Or</Subtitle>
                <Line />
            </SubtitleWrapper>
            <Subtitle>Log in</Subtitle>
            <Input width={"250px"} name="accessPIN" value={accessPIN} setValue={setAccessPIN} placeholder={"Access PIN"}/>
            <Button width={"150px"} height={"50px"} onClick={handleLogIn}>Log in</Button>
        </HomeWrapper>
    )
}