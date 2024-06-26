import {useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding-top: 80px;
  //width: 30%;
  //margin: 0 auto;
  align-self: stretch;
  padding: 80px 30% 0 30%;
  flex-grow: 1;
  overflow: auto;
    
    & > h1 {
        white-space: nowrap;
    }
    @media (max-width: 580px) {
        //width: 60%;
        padding: 80px 15% 0 15%;
    }
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

    //@media (max-width: 580px) and (min-width: 400px) {
    //    width: 150%;
    //}
`;

const ErrorMessage = styled.div`
  width: 100%;
  color: red;
  margin-bottom: 10px;
  text-align: start;
`;

const SubmitButton = styled.div`
  margin-top: 30px;
  width: 100%;
  background-color: ${(props) => (props.$allValid ? "#0074ff" : "gray")};
  border-radius: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  padding: 10px 0;
  cursor: pointer;

    //@media (max-width: 580px) and (min-width: 400px)  {
    //    width: 100%;
    //    font-size: 20px;
    //    padding: 10px 0;
    //}
`;

const AlreadyHasId = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin-top: 30px;

    //@media (max-width: 580px) and (min-width: 400px) {
    //    font-size: medium;
    //    width: 230%;
    //    margin-top: 20px;
    //}
`;

const StyleLink = styled(Link)`
  color: #0074ff;
`;

const nameRegex = /^[ㄱ-ㅎ|가-힣]+$/;
const idRegex = /^[a-zA-Z0-9]{1,12}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const ageRegex = /^[0-9]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/;

const SignUpPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("김현준")
  const [id, setId] = useState("ASDFaa")
  const [email, setEmail] = useState("asd@naver.com")
  const [age, setAge] = useState("24")
  const [password, setPassword] = useState("Hyeon1!")
  const [passwordCheck, setPasswordCheck] = useState("Hyeon1!")

  const [nameTouched, setNameTouched] = useState(null)
  const [idTouched, setIdTouched] = useState(null)
  const [emailTouched, setEmailTouched] = useState(null)
  const [ageTouched, setAgeTouched] = useState(null)
  const [passwordTouched, setPasswordTouched] = useState(null)
  const [passwordCheckTouched, setPasswordCheckTouched] = useState(null)

  const nameInvalid = useMemo(() => {
    if (name === "")
      return "이름을 입력해주세요!"
    if (!nameRegex.test(name))
      return "올바른 이름을 입력해주세요!"

    return null
  }, [name])

  const idInValid = useMemo( () => {
    if (id === "")
      return "아이디를 입력해주세요!"
    if (!idRegex.test(id))
      return "올바른 아이디를 입력해주세요!"

    return null
  }, [id])

  const emailInvalid = useMemo(() => {
    if (email === "")
      return "이메일을 입력해주세요!"
    if (!emailRegex.test(email))
      return "올바른 이메일 형식을 입력해주세요!"

    return null
  }, [email])

  const ageInvalid = useMemo(() => {
    if (age === "")
      return "나이를 입력해주세요!"
    if (!ageRegex.test(age))
      return "숫자를 입력해주세요!"
    if (parseInt(age) < 1)
      return "나이는 양수여야 합니다!"
    if (isNaN(parseInt(age)))
      return "나이는 실수로 입력할 수 없습니다!"
    if (parseInt(age) < 19)
      return "19세 이상만 가입이 가능합니다!"
    
    return null
  }, [age])

  const passwordInvalid = useMemo(() => {
    if (password === "")
      return "비밀번호를 입력해주세요!"
    if (!passwordRegex.test(password))
      return "비밀번호는 4-12자의 영소문자, 숫자, 특수문자를 모두 조합해서 입력해주세요!"

    return null
  }, [password])

  const passwordCheckInvalid = useMemo(() => {
    if (passwordCheck === "")
      return "비밀번호를 입력해주세요!"
    if (password !== passwordCheck)
      return "비밀번호가 일치하지 않습니다!"

    return null
  }, [password, passwordCheck])

  const formValid = useMemo(
    () => !nameInvalid && !idInValid && !emailInvalid && !ageInvalid && !passwordInvalid && !passwordCheckInvalid,
    [nameInvalid, idInValid, ageInvalid, emailInvalid, passwordInvalid, passwordCheckInvalid]
  )

  const signUpClick = async () => {
    if (formValid) {
      const body = JSON.stringify({ name, username: id, email, age: age, password, passwordCheck });
      // B.E.로 보내기 =
      const response = await fetch("http://localhost:8080/auth/signup", { method: "POST", body, headers: { "Content-Type": "application/json" } })
      if (response.ok) { // 응답코드가 200번대이면!
        alert("회원가입에 성공하였습니다.");
        navigate("/login");
      } else {
        alert("회원가입 실패!!")
      }
    } else {
      console.log("필드에 잘못된 데이터가 있습니다.");
    }
  };

  return (
    <Container>
      <h1>회원가입 페이지</h1>
      <FormContainer>
        <StyleInput
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onBlur={() => setNameTouched(true)}
          onChange={(event) => setName(event.target.value)}
        />
        {nameInvalid && nameTouched && <ErrorMessage>{nameInvalid}</ErrorMessage>}

        <StyleInput
          type="id"
          placeholder="아이디를 입력해주세요"
          value={id}
          onBlur={() => setIdTouched(true)}
          onChange={(event) => setId(event.target.value)}
        />
        {idInValid && idTouched && <ErrorMessage>{idInValid}</ErrorMessage>}

        <StyleInput
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onBlur={() => setEmailTouched(true)}
          onChange={(event) => setEmail(event.target.value)}
        />
        {emailInvalid && emailTouched && <ErrorMessage>{emailInvalid}</ErrorMessage>}

        <StyleInput
          type="text"
          placeholder="나이를 입력해주세요"
          value={age}
          onBlur={() => setAgeTouched(true)}
          onChange={(event) => setAge(event.target.value)}
        />
        {ageInvalid && ageTouched && <ErrorMessage>{ageInvalid}</ErrorMessage>}

        <StyleInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onBlur={() => setPasswordTouched(true)}
          onChange={(event) => setPassword(event.target.value)
          }
        />
        {passwordInvalid && passwordTouched && <ErrorMessage>{passwordInvalid}</ErrorMessage>}

        <StyleInput
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onBlur={() => setPasswordCheckTouched(true)}
          onChange={(event) => setPasswordCheck(event.target.value)}
        />
        {passwordCheckInvalid && passwordCheckTouched && <ErrorMessage>{passwordCheckInvalid}</ErrorMessage>}
      </FormContainer>

      <SubmitButton
        onClick={signUpClick}
        $allValid={formValid}
      >
        제출하기
      </SubmitButton>
      <AlreadyHasId>
        <div>이미 아이디가 있으십니까?</div>
        <StyleLink to={"/login"}>로그인 페이지로 이동하기</StyleLink>
      </AlreadyHasId>
    </Container>
  );
};

export default SignUpPage;