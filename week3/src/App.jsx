import styled from "styled-components";
import {Outlet} from "react-router-dom";
import {Footer, Header} from "./pages/Fixed.jsx";
import "./App.css"
import {UserContextProvider} from "./UserContext.jsx";

function App() {
    return (
      <UserContextProvider>
        <AppRoot>
          <Header/>
          <Outlet/>
          <Footer/>
        </AppRoot>
      </UserContextProvider>
    );
  }

const AppRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    
    flex: 1;
    min-height: 0;
`

export default App;
