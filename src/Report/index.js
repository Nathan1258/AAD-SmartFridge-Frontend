import styled from "styled-components";

const ReportWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  margin: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  color: white;
`;

export function Report(props) {
  return (
    <ReportWrapper>
      <Title>Report</Title>
    </ReportWrapper>
  );
}
