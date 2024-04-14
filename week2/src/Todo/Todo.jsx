// import React from "react";
import { useState, useEffect } from "react";
import "./Todo.css";

function Todo() {
  // 입력한 투두리스트의 내용을 저장할 inputValue 변수와 inputValue 변수 값을 변경할 수 있는 함수 선언 (useState 이용)
  const [inputValue, setInputValue] = useState("");

  // 투두리스트 값 전체를 저장하는 todos 변수와 todos 변수 값을 변경할 수 있는 함수 선언 (useState 이용)
  const [todos, setTodos] = useState([
    { id: 1, content: "Send E-mail", isDone: false },
    { id: 2, content: "Make Work-Books", isDone: false },
    { id: 3, content: "Sleeping", isDone: true },
    { id: 4, content: "Watching You-Tube", isDone: true },
  ]);

  // 투두리스트를 완료했을 때 실행되는 함수 (여러 개의 투두리스트 중에서 선택한 투두리스트만 완료가 되어야하므로 id 값을 통해서 실행)
  const completeTodos = (id) => {
    const updatedTodos = todos.map((todo) =>
      // 기존의 id 값과 content 값은 그대로 사용하고 isDone 값만 true로 변경
      todo.id === id ? { ...todo, isDone: true } : todo
    );
    // 변경된 투두리스트로 todos 값을 변경
    setTodos(updatedTodos);
  };

  // todos 값이 변경되면 화면이 리렌더링 되도록 설정
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  // 투두리스트를 추가할 때 실행되는 함수
  const addTodos = (newTodoContent) => {
    // 공백이 아닌 경우에만 실행되도록 설정
    if (newTodoContent.trim() !== "") {
      // 기존 todos 배열의 길이 + 1만큼의 id 값을 갖고, 입력한 content 값을 가지며, isDone이 false(완료하지 않음)인 새로운 투두리스트 항목 생성
      const newTodo = {
        id: todos.length + 1,
        content: newTodoContent,
        isDone: false,
      };
      // 기존 todos 배열의 값을 그대로 가져온 뒤, 해당 값에 새로운 투두리스트 항목까지 추가하여 todos를 설정
      setTodos([...todos, newTodo]);
    }
  };

  // 투두리스트 항목을 입력한 뒤 Enter 키를 누르면 addTodos 함수를 호출하여 투두리스트 항목이 추가되도록 설정
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodos(inputValue);
      // 투두리스트 항목을 추가하였다면 입력한 값을 초기화
      setInputValue("");
    }
  };

  // 완료된 투두리스트를 삭제하는 함수
  const deleteTodos = (id) => {
    // 선택한 투두리스트의 id 값을 제외하고 나머지 id 값을 갖는 투두리스트 항목들만 복사하여 새로운 배열 생성
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // 이후 생성한 새로운 배열로 todos를 업데이트
    setTodos(updatedTodos);
  };

  return (
    <div className="page-container">
      <h1 className="header">UMC Study Plan</h1>
      <hr />

      {/* Todos 추가하는 input */}
      <input
        type="text"
        placeholder="UMC 스터디 계획을 작성해보세요!"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyPress={handleKeyPress}
      />

      {/* 해야 할 일 리스트 */}
      <div className="list-container">
        <div className="list-wrapper">
          <h2>해야 할 일</h2>
          {todos.map(
            (data) =>
              // isDone이 false인 값들만 출력시키기
              !data.isDone && (
                <div key={data.id} className="list">
                  <div>{data.content}</div>
                  <div>
                    {/* 생성한 투두리스트를 완료하는 버튼 */}
                    <button
                      className="stylebutton"
                      onClick={() => completeTodos(data.id)}
                    >
                      완료
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
        {/* 해낸 일 리스트 */}
        <div className="list-wrapper">
          <h2>해낸 일</h2>
          {todos.map(
            (data) =>
              //isDone이 true인 값들만 출력시키기
              data.isDone && (
                <div key={data.id} className="list">
                  <div>{data.content}</div>
                  <div>
                    {/* 완료한 투두리스트를 삭제하는 버튼 */}
                    <button
                      className="stylebutton"
                      onClick={() => deleteTodos(data.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;

// 105번 줄에 있는  {/* isDone이 true인 값들만 출력시키기 */} 부분이 에러를 띄우는 것을 확인.
// 확인결과 이미 JSX 표현식 {} 내부에 있기 때문에 해당 주석은 사용 불가능하다는 것을 확인.
// 따라서 해당 주석을 "//" 를 사용하는 것으로 바꾸었으나 이번엔 class 키워드들에 에러가 발생.
// 빠른 수정을 참고하여 class 들을 className으로 수정
// 1번줄 import React 에러 발생, 빠른 수정을 참고하여 해당 줄 삭제.
// 정상동작.
// 해당 이유는 후에 질문으로 해결하자.

// 75번줄 onKeyPress={handleKeyPress} 비활성화 문제. 왜?
