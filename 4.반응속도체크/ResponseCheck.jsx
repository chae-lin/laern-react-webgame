import React, { useRef, useState } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  // hooks에서는 this의 속성들을(화면에 영향을 주지 않는 것) ref로 표현
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");
      // ref는 .current에 넣어준다.
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
    } else if (state === "ready") {
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage("너무 성급하세요!");
    } else if (state === "now") {
      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
      endTime.current = new Date();
    }
  };

  const onClickReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return (
      result.length > 0 && (
        <>
          <div>
            평균 시간: {result.reduce((a, c) => a + c) / result.length}ms
          </div>
          <button onClick={onClickReset}>리셋</button>
        </>
      )
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
