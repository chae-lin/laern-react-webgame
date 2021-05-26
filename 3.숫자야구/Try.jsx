import React, { memo } from "react";

// 함수형컴포넌트에서는 memo사용
const Try = memo(({ tryInfo }) => {
  /* 
    부모로 받은 props를 바꿔줘야 하는 경우 stat를 새로운 state로 만들어주고 변경.
    const [result, setResult] = useState(tryInfo.result);
    const onClick = () => {
      setResult('1');
    }
  */
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
