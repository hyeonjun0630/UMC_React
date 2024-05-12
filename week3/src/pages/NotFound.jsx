import styled from "styled-components";

export function NotFoundPage() {
  return (
    <NotFound>
      <h1>Oops!</h1>
      <div> 못한 에러가 발생했습니다 ;( </div>
      <div id="bold">Not Found</div>
      <a href={"/"}>메인으로 이동하기</a>
    </NotFound>
  );
}

const NotFound = styled.div`
    background-color: #363636;
    height: 100%;
    color: white;
    text-align: center;
    
    & > #bold {
        font-weight: bold;
        font-style: italic;
        padding: 10px 0;
    }
`