import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    margin: 0;
    background-image: url(/background.jpeg);
    background-size: cover;
    background-repeat: no-repeat;
`

const Title = styled.h1`
    margin: 0;
    padding: 10px;
    color: white;
`;

const Subtitle = styled.h2`
    margin: 0;
    padding: 10px;
    color: white;
`

const LoginButton = styled.button`
`


export function Home(props){

    const navigate = useNavigate();

    function handleClick() {
        navigate("/login");
    }

    return (
        <HomeWrapper>
            <Title>Smart Fridge</Title>
            <Subtitle>Eating done smarter</Subtitle>
            <LoginButton onClick={handleClick}>Login</LoginButton>
        </HomeWrapper>
    )
}