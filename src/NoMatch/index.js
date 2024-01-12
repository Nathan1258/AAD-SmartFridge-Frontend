import styled from "styled-components";

const NoMatchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`


export function NoMatch(props){

    return (
        <NoMatchWrapper>
            <h1>404</h1>
            <h2>We have no idea where you are.</h2>
        </NoMatchWrapper>
    )
}