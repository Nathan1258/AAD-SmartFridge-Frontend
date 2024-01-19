import styled from "styled-components";
import Button from "../ReuseableComponents/Button";


const DashboardWrapper = styled.div`
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


export function Dashboard(props){

    return (
        <DashboardWrapper>
            <Title>Dashboard</Title>
            <Button>Click me</Button>
        </DashboardWrapper>
    )
}