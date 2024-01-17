import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../ReuseableComponents/Button"
import Input from "../ReuseableComponents/Input";
import {useState} from "react";
import {usePopup} from "../Popup/popupContext";


const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    margin: 0;
    background-image: linear-gradient(#10002b, #e0aaff);
    background-size: cover;
    background-repeat: no-repeat;
`

const Title = styled.h1`
    margin: 0;
    font-size: 5rem;
    color: white;
`;

const SubtitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding: 10px;
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
`;

export function ClockIn(props){

    const navigate = useNavigate();
    const {triggerPopup} = usePopup();

    const [userNumber, setUserNumber] = useState('');
    const [password, setPassword] = useState('');

    function handleClick() {
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
        triggerPopup("Clocked in", "You've successfully clocked in. Your PIN for the day is: " + data.data.accessPIN, "Okay")
    })
    .catch(error => console.error('Error:', error));
    }

    return (
        <HomeWrapper>
            <Title>Clock In</Title>
            <SubtitleWrapper>
                <Line />
                    <Subtitle>Enter your user number and password</Subtitle>
                <Line />
            </SubtitleWrapper>
            <Input width={"20%"} name="userNumber" value={userNumber} setValue={setUserNumber} placeholder={"User Number"}/>
            <Input width={"20%"} name="password" value={password} setValue={setPassword} placeholder={"Password"}/>
            <Button width={"25%"} height={"50px"} onClick={handleClick}>Clock In</Button>
        </HomeWrapper>
    )
}