import styled from "styled-components";

function App() {
  return (
    <>
      <StyledDiv>안녕자두야</StyledDiv>
    </>
  );
}

const StyledDiv = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default App;
