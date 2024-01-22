import styled from "styled-components";

const NavBarWrapper = styled.div`
    display: flex;
    //justify-content: space-evenly;
`;

const NavTitle = styled.h1`
    padding-left: 20px;
    .ff {
        color: grey;
    }
    .smart {
        color: white;
    }
`;

export function NavBar(props) {
    return (
        <NavBarWrapper>
            <NavTitle>
                <span className="ff">FF</span>
                <span className="smart">smart.</span>
            </NavTitle>
        </NavBarWrapper>
    );
}
