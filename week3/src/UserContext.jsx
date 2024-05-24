import {createContext, useCallback, useContext, useEffect, useState} from "react";

const UserContext = createContext({ }) // 원래는 이렇게 하면 안됩니다!!

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user,  setUser] = useState(null)

  const login = useCallback(async (id, pw) => {
    const body = JSON.stringify({
      username: id,
      password: pw
    })
    // JSON.stringify덕분에 오브젝트가 다음과 같은 문자열 형태로 저장될 수 있다. -> "{ "username": "asdfasd", "password": "ASDFASDFASDF" }"

    // await fetch() 의 리턴 타입은 Promise<Response> 입니다.
    // Promise 는, 지금 당장이 아닌 미래의 언젠가 Response(꺽쇠괄호 안의 타입) 를 리턴한다는 '약속'을 표현하는 오브젝트.
    // 네트워크 요청은 실행 즉시 응답이 돌아오지 않고 시간이 조금 걸리기 때문에, '미래'라고 표현함.
    // 다만, 이 미래가 도래할 때까지 단순히 '기다리면', JS 로직이 중지되기 때문에 페이지가 '응답없음' 상태가 됨.
    // 그렇기 때문에 '비동기'적으로 코드를 실행해야하며, 그것이 Promise 의 역할.

    // 물론 Promise 는 단순히 약속이기 때문에, 지금 당장 값을 가져올 수 있어야 하겠죠?
    // 그래서 이 약속의 때가 도래할 때까지 기다리는 방법에 두 가지가 있습니다:

    // - async 함수 안에서 await 사용하기
    // - .then() 사용하기
    const loginResponse = await fetch("http://localhost:8080/auth/login", { method: "POST", body, headers: { "Content-Type": "application/json"} })
    if (loginResponse.status === 401)
      throw Error({ status: 401, at: "login" })

    const { token } = await loginResponse.json()

    setToken(token)
    localStorage.setItem("token", token)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
  }, [])

  useEffect(() => {
    if (!token) return

    const async = async () => {
      const myInfoResponse = await fetch(
        "http://localhost:8080/auth/me",
        {method: "GET", headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}}
      )

      if (myInfoResponse.status !== 200) {
        logout()
        throw Error({status: myInfoResponse.status, at: "me"})
      }

      const me = await myInfoResponse.json()
      // me 는 username, name, age, email 을 가지는 오브젝트.

      setUser(me)
    }
    async().then()
  }, [token, logout])

  return (
    <UserContext.Provider value={{ token, setToken, login, logout, user }}>
      {children}
    </UserContext.Provider>
  )
}
