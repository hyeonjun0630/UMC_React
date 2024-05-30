import {useMemo, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../UserContext.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  width: 30%;
  margin: 0 auto;
  flex-grow: 1;
  overflow: auto;
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

const idRegex = /^[a-zA-Z0-9]{1,12}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/;

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useUserContext()

  // const [inputValue, setInputValue] = useState({ // 기존부분
  //   email: "",
  //   password: "",
  // });

  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const [emailTouched, setEmailTouched] = useState(null)
  const [passwordTouched, setPasswordTouched] = useState(null)

  const idInValid = useMemo( () => {
    if (id === "")
      return "아이디를 입력해주세요!"
    if (!idRegex.test(id))
      return "올바른 아이디를 입력해주세요!"

    return null
  }, [id])

  const passwordInvalid = useMemo(() => {
    if (password === "")
      return "비밀번호를 입력해주세요!"
    if (!passwordRegex.test(password))
      return "비밀번호는 4-12자의 영소문자, 숫자, 특수문자를 모두 조합해서 입력해주세요!"

    return null
  }, [password])

  const formValid = useMemo(
    () => !idInValid && !passwordInvalid,
    [idInValid, passwordInvalid]
  )

  const clearForm = () => {
    setId("")
    setPassword("")
    setEmailTouched(null)
    setPasswordTouched(null)
  }

  const LogInClick = async () => {
    if (formValid) {
      try {
        await login(id, password)
        alert("로그인에 성공하였습니다.");
        navigate("/");
      } catch (e) {
        alert("로그인에 실패하였습니다.");
      }
    } else {
      alert("필드에 이상한 값이 있습니다.");
      clearForm()
    }
  };

  return (
    <Container>
      <h1>로그인 페이지</h1>
      <FormContainer>
        <StyleInput
          type="text"
          placeholder="아이디를 입력해주세요"
          // value={inputValue.id}
          value={id}
          onBlur={() => setEmailTouched(true)}
          onChange={(event) =>
            // setInputValue({ ...inputValue, id: event.target.value })
            setId(event.target.value)}
        />
        {idInValid && emailTouched && <ErrorMessage>{idInValid}</ErrorMessage>}

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