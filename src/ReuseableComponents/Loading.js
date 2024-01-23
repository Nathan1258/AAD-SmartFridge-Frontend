import React from 'react';
import styled from 'styled-components';
import PacManLoader from "react-spinners/PacmanLoader";

const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoadingText = styled.h1`
    color: white;
`

const Loading = ({ children}) => {
  return (
    <LoadingWrapper>
        <LoadingText>{children}</LoadingText>
        <PacManLoader color={"white"}/>
    </LoadingWrapper>
  );
};

export default Loading;
