import styled from "styled-components";


const DashboardWrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    background: gray;
    margin: 0;
    background-size: cover;
    background-repeat: no-repeat;
`

const Title = styled.h1`
    margin: 0;
    font-size: 2.5rem;
    color: white;
`;


export function Dashboard(props){

    return (
        <DashboardWrapper>
            <Title>Dashboard</Title>
        </DashboardWrapper>
    )
}