import {useState} from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  width: 30%;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleInput = styled.input`
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  border-radius: 15px;
  font-size: 18px;
`;

const SubmitButton = styled.div`
  margin-top: 40px;
  width: 50%;
  background-color: #0074ff;
  border-radius: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  padding: 10px 0;
  cursor: pointer;
`;

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  return (
    <Container>
      <h1>로그인 페이지</h1>
      <FormContainer>
        <StyleInput
          type="email"
          placeholder="이메일을 입력해주세요"
          value={inputValue.email}
          onChange={(event) =>
            setInputValue({ ...inputValue, email: event.target.value })
          }
        />

        <StyleInput
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          value={inputValue.password}
          onChange={(event) =>
            setInputValue({ ...inputValue, password: event.target.value })
          }
        />
      </FormContainer>

      <SubmitButton>로그인</SubmitButton>
    </Container>
  );
};

export default LoginPage;