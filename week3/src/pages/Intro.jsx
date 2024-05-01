import styled from "styled-components";

export const Intro = () => {
  return (
    <>
      <IntroContent>환영합니다</IntroContent>
      <Back>
        <BackContent>Find your movies!</BackContent>
        <TextBox></TextBox>
      </Back>

    </>
  )
}

const IntroContent = styled.div`
    font-weight: bold;
    font-size: x-large;
    height: 10em;
    color: white;
    background-color: black;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Back = styled.div`
    width: 100%;
    height: 100%;
    background-color: #272727;
 `

const BackContent = styled.div`
    color: #ffffff;
    text-align: center;
    margin: 50px;
    font-size: xx-large;
    font-weight: bold;
`

const TextBox = styled.input`
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;

    &:focus {
        border-color: #6495ed;
    }
`