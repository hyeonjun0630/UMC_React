import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {useUserContext} from "../UserContext.jsx";
import PropTypes from "prop-types";

export const Header = () => {
  const { token, logout } = useUserContext()

  return (
    <HeaderRoot>
      <HeaderTitle><HeaderItem to={"/"}>UMC Movie</HeaderItem></HeaderTitle>

      <Spacer/>

      {token ?
        <>
          <HeaderAnchor to={""} onClick={logout}>로그아웃</HeaderAnchor>
        </> :
        <>
          <HeaderItem to={"/signUp"}>회원가입</HeaderItem>
          <HeaderItem to={"/login"}>로그인</HeaderItem>
        </>
      }
      <HeaderItem to={"/popular"}>Popular</HeaderItem>
      <HeaderItem to={"/nowplaying"}>Now Playing</HeaderItem>
      <HeaderItem to={"/toprated"}>Top Rated</HeaderItem>
      <HeaderItem to={"/upcoming"}>Upcoming</HeaderItem>
    </HeaderRoot>
  )
}

const HeaderItem = props => {
  const location = useLocation()
  return <HeaderAnchor to={props.to} selected={location.pathname === props.to}>{props.children}</HeaderAnchor>
}
HeaderItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node
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
