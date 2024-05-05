import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

export const Header = () => {
  const location = useLocation()

  return (
    <HeaderRoot>
      <HeaderTitle><HeaderAnchor to={"/"} selected={location.pathname === "/"}>UMC Movie</HeaderAnchor></HeaderTitle>

      <Spacer/>

      <LoginButton>로그인</LoginButton>
      <HeaderAnchor to={"/popular"} selected={location.pathname === "/popular"}>Popular</HeaderAnchor>
      <HeaderAnchor to={"/nowplaying"} selected={location.pathname === "/nowplaying"}>Now Playing</HeaderAnchor>
      <HeaderAnchor to={"/toprated"} selected={location.pathname === "/toprated"}>Top Rated</HeaderAnchor>
      <HeaderAnchor to={"/upcoming"} selected={location.pathname === "/upcoming"}>Upcoming</HeaderAnchor>
    </HeaderRoot>
  )
}

function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setIsLoggedIn(prevState => !prevState);
  };

  return (
      <Button onClick={handleClick}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </Button>
  );
}

const Button = styled.button`
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    text-decoration: none;
    color: white;
`
const HeaderRoot = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: white;
    background-color: #272727;
`

const HeaderTitle = styled.p``

const Spacer = styled.div`
  flex: 1;
`

const HeaderAnchor = styled(Link)`
    border: none;
    background: none;
    padding: 4px 8px;
    color: ${props => props.selected ? "#FFFF00" : "white"};
    font-weight: ${props => props.selected ? "bold" : "normal"};
    text-decoration: none;
    
    transition: transform 0.1s linear;
    
    &:hover {
        transform: scale(1.05);
    }
`

export const Footer = () => {
  return (
    <FooterRoot>
      {/*<a href={"https://www.makeus.in/umc"}>https://www.makeus.in/umc</a>*/}
      https://www.makeus.in/umc
    </FooterRoot>
  )
}

const FooterRoot  = styled.div`
    text-align: right;
    padding: 8px 16px;
    background-color: #272727;
    color: white;
    //text-decoration: none;
`
