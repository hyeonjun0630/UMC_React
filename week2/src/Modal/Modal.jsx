//팝업 내용
import "./Modal.css";

// function Modal({setVisible}) 같은의미
function Modal(children) {
  return (
    <>
      <div id="Modal">
        <div id="modal-content">
          <h2>안녕하세요</h2>
          <div>모달 내용은 어쩌고 저쩌고...</div>
          <button
            id="MycloseButton"
            onClick={() => {
              //setVisible(false); 같은 의미
              children.setVisible(false);
              console.log("모달이 꺼짐");
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </>
  );
}
export default Modal;
