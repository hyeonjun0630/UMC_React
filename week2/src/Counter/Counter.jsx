import { useState } from "react";
//import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);

  // a와 b는 같은 의미지만 a처럼 하면 문장 하나밖에 쓰지 못한다
  // const a = () => console.log("ASDF");
  // const b = () => {
  //   return console.log("ASDF");
  // };

  return (
    <>
      <h1>{count}</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            console.log("increase가 클릭됨");
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            setCount((count) => count - 1);
            console.log("decrease가 클릭됨");
          }}
        >
          -1
        </button>
      </div>
    </>
  );
}
export default Counter;
