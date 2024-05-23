import {useMemo, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

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

const ErrorMessage = styled.div`
  width: 100%;
  color: red;
  margin-bottom: 10px;
  text-align: start;
`;

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/;

const LoginPage = () => {
  const navigate = useNavigate();

  // const [inputValue, setInputValue] = useState({ // 기존부분
  //   email: "",
  //   password: "",
  // });

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailTouched, setEmailTouched] = useState(null)
  const [passwordTouched, setPasswordTouched] = useState(null)

  const emailInvalid = useMemo(() => {
    if (email === "")
      return "이메일을 입력해주세요!"
    if (!emailRegex.test(email))
      return "올바른 이메일 형식을 입력해주세요!"

    return null
  }, [email])

  const passwordInvalid = useMemo(() => {
    if (password === "")
      return "비밀번호를 입력해주세요!"
    if (!passwordRegex.test(password))
      return "비밀번호는 4-12자의 영소문자, 숫자, 특수문자를 모두 조합해서 입력해주세요!"

    return null
  }, [password])

  const formValid = useMemo(
    () => !emailInvalid && !passwordInvalid,
    [emailInvalid, passwordInvalid]
  )

  const LogInClick = () => {
    if (formValid) {
      alert("로그인에 성공하였습니다.");
      const user = { email, password };
      console.log("유저정보", user);
      navigate("/");
    } else {
      console.log("로그인에 실패하였습니다.");
      alert("로그인에 실패하였습니다.");
      window.location.reload(); // 페이지 새로고침
    }
  };

  return (
    <Container>
      <h1>로그인 페이지</h1>
      <FormContainer>
        <StyleInput
          type="email"
          placeholder="이메일을 입력해주세요"
          // value={inputValue.email}
          value={email}
          onBlur={() => setEmailTouched(true)}
          onChange={(event) =>
            // setInputValue({ ...inputValue, email: event.target.value })
            setEmail(event.target.value)}
        />
        {emailInvalid && emailTouched && <ErrorMessage>{emailInvalid}</ErrorMessage>}

        <StyleInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          // value={inputValue.password}
          value={password}
          onBlur={() => setPasswordTouched(true)}
          onChange={(event) =>
            // setInputValue({ ...inputValue, password: event.target.value })
            setPassword(event.target.value)}
        />
        {passwordInvalid && passwordTouched && <ErrorMessage>{passwordInvalid}</ErrorMessage>}
      </FormContainer>

      <SubmitButton
        onClick={LogInClick}
        $allValid={formValid}
      >
        로그인
      </SubmitButton>
    </Container>
  );
};

export default LoginPage;