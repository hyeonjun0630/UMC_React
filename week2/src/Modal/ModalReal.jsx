import { useState } from "react";
import Modal from "./Modal";

// 배경 기본
function ModalReal() {
  // [변수, 변수를 바꿀 함수] = useState(변수의 초기값)
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div id="backContent">
        <h1>안녕하세요!</h1>
        <p>내용내용내용</p>
      </div>

      <button
        id="MyopenButton"
        onClick={() => {
          setVisible(true);
          console.log("모달이 켜짐");
        }}
      >
        버튼 열기
      </button>

      {/* <Modal 치고 엔터 -> 1번줄 생성 */}
      {/* {visible && <Modal/>}
      visible 이 false 라면 뒤의 구문을 평가하지 않고 넘어가므로 
      {false}
      와 같은 구문이 된다.
      이 때 false 는 React 에서 '아무것도 렌더링하지 않음' 으로 해석되므로 
      visible 이 false 일 때는 아무것도 렌더링하지 않는다. */}
      {visible && <Modal setVisible={setVisible} />}
    </>
  );
}
export default ModalReal;
