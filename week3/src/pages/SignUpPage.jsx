import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
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

const ErrorMessage = styled.div`
  width: 100%;
  color: red;
  margin-bottom: 10px;
  text-align: start;
`;

const SubmitButton = styled.div`
  margin-top: 30px;
  width: 50%;
  background-color: ${(props) => (props.$allValid ? "#0074ff" : "gray")};
  border-radius: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  padding: 10px 0;
  cursor: pointer;
`;

const AlreadyHasId = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: 30px;
`;

const StyleLink = styled(Link)`
  color: #0074ff;
`;

const SignUpPage = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    passwordCheck: "",
  });

  const [isError, setIsError] = useState({
    nameError: "",
    emailError: "",
    ageError: "",
    passwordError: "",
    passwordCheckError: "",
  });

  const [isAvailable, setIsAvailable] = useState({
    nameAvailable: false,
    emailAvailable: false,
    ageAvailable: false,
    passwordAvailable: false,
    passwordCheckAvailable: false,
  });

  const nameRegex = /^[ㄱ-ㅎ|가-힣]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const ageRegex = /^[0-9]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/;

  const handleValid = () => {
    // 이름 오류
    if (inputValue.name == "") {
      setIsError((prevError) => ({
        ...prevError,
        nameError: "이름을 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        nameAvailable: false,
      }));
    } else if (!nameRegex.test(inputValue.name)) {
      setIsError((prevError) => ({
        ...prevError,
        nameError: "올바른 이름을 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        nameAvailable: false,
      }));
    } else {
      setIsError((prevError) => ({
        ...prevError,
        nameError: "",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        nameAvailable: true,
      }));
    }

    // 이메일 오류
    if (inputValue.email == "") {
      setIsError((prevError) => ({
        ...prevError,
        emailError: "이메일을 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        emailAvailable: false,
      }));
    } else if (!emailRegex.test(inputValue.email)) {
      setIsError((prevError) => ({
        ...prevError,
        emailError: "올바른 이메일 형식을 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        emailAvailable: false,
      }));
    } else {
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        emailAvailable: true,
      }));
    }

    // 나이 오류
    if (inputValue.age == "") {
      setIsError((prevError) => ({
        ...prevError,
        ageError: "나이를 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        ageAvailable: false,
      }));
    } else if (!ageRegex.test(inputValue.age)) {
      setIsError((prevError) => ({
        ...prevError,
        ageError: "숫자를 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        ageAvailable: false,
      }));
    } else if (parseInt(inputValue.age) < 1) {
      setIsError((prevError) => ({
        ...prevError,
        ageError: "나이는 양수여야 합니다!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        ageAvailable: false,
      }));
    } else if (isNaN(parseInt(inputValue.age))) {
      setIsError((prevError) => ({
        ...prevError,
        ageError: "나이는 실수로 입력할 수 없습니다!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        ageAvailable: false,
      }));
    } else if (parseInt(inputValue.age) < 19) {
      setIsError((prevError) => ({
        ...prevError,
        ageError: "19세 이상만 가입이 가능합니다!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        ageAvailable: false,
      }));
    } else {
      setIsError((prevError) => ({ ...prevError, ageError: "" }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        ageAvailable: true,
      }));
    }

    // 비밀번호 오류
    if (inputValue.password == "") {
      setIsError((prevError) => ({
        ...prevError,
        passwordError: "비밀번호를 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        passwordAvailable: false,
      }));
    } else if (!passwordRegex.test(inputValue.password)) {
      setIsError((prevError) => ({
        ...prevError,
        passwordError:
          "비밀번호는 4-12자의 영소문자, 숫자, 특수문자를 모두 조합해서 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        passwordAvailable: false,
      }));
    } else {
      setIsError((prevError) => ({
        ...prevError,
        passwordError: "",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        passwordAvailable: true,
      }));
    }

    // 비밀번호 확인 오류
    if (inputValue.passwordCheck == "") {
      setIsError((prevError) => ({
        ...prevError,
        passwordCheckError: "비밀번호를 입력해주세요!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        passwordCheckAvailable: false,
      }));
    } else if (inputValue.password !== inputValue.passwordCheck) {
      setIsError((prevError) => ({
        ...prevError,
        passwordCheckError: "비밀번호가 일치하지 않습니다!",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        passwordCheckAvailable: false,
      }));
    } else {
      setIsError((prevError) => ({
        ...prevError,
        passwordCheckError: "",
      }));
      setIsAvailable((prevAvailable) => ({
        ...prevAvailable,
        passwordCheckAvailable: true,
      }));
    }
  };

  useEffect(() => {
    handleValid();
  }, [inputValue]);

  const SignUpClick = () => {
    if (
      isAvailable.nameAvailable &&
      isAvailable.emailAvailable &&
      isAvailable.ageAvailable &&
      isAvailable.passwordAvailable &&
      isAvailable.passwordCheckAvailable
    ) {
      alert("회원가입에 성공하였습니다.");
      const user = {
        이름: inputValue.name,
        이메일: inputValue.email,
        나이: inputValue.age,
        비밀번호: inputValue.password,
      };
      console.log("유저정보", user);
      navigate("/login");
    } else {
      console.log("회원가입에 실패하였습니다.");
    }
  };

  return (
    <Container>
      <h1>회원가입 페이지</h1>
      <FormContainer>
        <StyleInput
          type="text"
          placeholder="이름을 입력해주세요"
          value={inputValue.name}
          onChange={(event) =>
            setInputValue({ ...inputValue, name: event.target.value })
          }
        />
        {isAvailable.nameAvailable ? null : (
          <ErrorMessage>{isError.nameError}</ErrorMessage>
        )}

        <StyleInput
          type="email"
          placeholder="이메일을 입력해주세요"
          value={inputValue.email}
          onChange={(event) =>
            setInputValue({ ...inputValue, email: event.target.value })
          }
        />
        {isAvailable.emailAvailable ? null : (
          <ErrorMessage>{isError.emailError}</ErrorMessage>
        )}

        <StyleInput
          type="text"
          placeholder="나이를 입력해주세요"
          value={inputValue.age}
          onChange={(event) =>
            setInputValue({ ...inputValue, age: event.target.value })
          }
        />
        {isAvailable.ageAvailable ? null : (
          <ErrorMessage>{isError.ageError}</ErrorMessage>
        )}

        <StyleInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={inputValue.password}
          onChange={(event) =>
            setInputValue({ ...inputValue, password: event.target.value })
          }
        />
        {isAvailable.passwordAvailable ? null : (
          <ErrorMessage>{isError.passwordError}</ErrorMessage>
        )}

        <StyleInput
          type="password"
          placeholder="비밀번호 확인"
          value={inputValue.passwordCheck}
          onChange={(event) =>
            setInputValue({ ...inputValue, passwordCheck: event.target.value })
          }
        />
        {isAvailable.passwordCheckAvailable ? null : (
          <ErrorMessage>{isError.passwordCheckError}</ErrorMessage>
        )}
      </FormContainer>

      <SubmitButton
        onClick={SignUpClick}
        $allValid={
          isAvailable.nameAvailable &&
          isAvailable.emailAvailable &&
          isAvailable.ageAvailable &&
          isAvailable.passwordAvailable &&
          isAvailable.passwordCheckAvailable
        }
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