import React, { memo } from "react";
import styled from "styled-components";

const BallWrap = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  border: 1px solid black;
  border-radius: 50%;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
`;

// 스테이트를 사용하지 않는 애들은 함수컴포넌트로 표현하는 것이 더 좋다.
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }

  return (
    <BallWrap className="ball" style={{ background }}>
      {number}
    </BallWrap>
  );
});

// 데이터를 담고 잇는 것이 아닌 화면만을 담고 있기 때문에 puerComponent 사용가능
// 컴포넌트를 다른 컴포넌트로 감싸는 것을 하이오더 컴포넌트라 부른다. (memo를 넣음으로써 puerComponent와 같은 역활을 하게 한다.)

export default Ball;
