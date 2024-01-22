import styled from "styled-components";


const InventoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    margin: 0;
`

const Title = styled.h1`
    margin: 0;
    font-size: 2.5rem;
    color: white;
`;

const SubTitle = styled.h4`
    margin: 0;
    padding-top: 10px;
    color: white;
`;


export function Inventory(props){

    return (
        <InventoryWrapper>
            <Title>Inventory</Title>
            <SubTitle>Manage and View Inventory Stock</SubTitle>
        </InventoryWrapper>
    )
}