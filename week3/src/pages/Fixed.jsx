import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";

export const Header = () => {
  const location = useLocation()

  return (
    <HeaderRoot>
      <HeaderTitle><HeaderAnchor to={"/"} selected={location.pathname === "/"}>UMC Movie</HeaderAnchor></HeaderTitle>

      <Spacer/>

      <HeaderAnchor to={"/signUp"} selected={location.pathname === "/signUp"}>회원가입</HeaderAnchor>
      <HeaderAnchor to={"/popular"} selected={location.pathname === "/popular"}>Popular</HeaderAnchor>
      <HeaderAnchor to={"/nowplaying"} selected={location.pathname === "/nowplaying"}>Now Playing</HeaderAnchor>
      <HeaderAnchor to={"/toprated"} selected={location.pathname === "/toprated"}>Top Rated</HeaderAnchor>
      <HeaderAnchor to={"/upcoming"} selected={location.pathname === "/upcoming"}>Upcoming</HeaderAnchor>
    </HeaderRoot>
  )
}

const HeaderRoot = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: white;
    background-color: #272727;
    flex-shrink: 0;
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
      https://www.makeus.in/umc
    </FooterRoot>
  )
}

const FooterRoot  = styled.div`
    text-align: right;
    padding: 8px 16px;
    background-color: #272727;
    color: white;
    flex-shrink: 0;
`
