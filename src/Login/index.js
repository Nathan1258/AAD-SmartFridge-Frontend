import styled from "styled-components";

const LoginWrapper = styled.div`
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



export function Login(props){
    return (
        <LoginWrapper>
            <Title>Login</Title>
            <Subtitle>Enter your details to login</Subtitle>
        </LoginWrapper>
    )
}