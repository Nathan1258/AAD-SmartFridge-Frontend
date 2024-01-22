import styled from "styled-components";
import Button from "../ReuseableComponents/Button";
import {useNavigate} from "react-router-dom";

const NoMatchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    color: white;
`


export function NoMatch(props){

    const navigate = useNavigate();

    function handleClick(){
        navigate("/dashboard");
    }

    return (
        <NoMatchWrapper>
            <h1>404</h1>
            <h2>We have no idea where you are.</h2>
            <Button height={"50px"} onClick={handleClick}>Take me back to safety</Button>
        </NoMatchWrapper>
    )
}