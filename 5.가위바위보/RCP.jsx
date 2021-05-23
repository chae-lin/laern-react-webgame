import React, { useRef, useState, useEffect } from "react";

/* 
                      훅스에서는 세로로 하나씩
                      클래스에서의 라이프 사이클은 가로로 하나씩
                      result,    imgCoord,    score
componentDidMount     
componentDidUpdate
componentWillUnmount

[ class형 컴포넌트에서 ]
componentDidMount() {
  this.setState({
    imgCoord : 1,
    score: 2,
    result: 3,
  })
}

[ hooks형 컴포넌트에서 ]
useEffect(()=> {
  setimgCoord();
}, [imgCoord]);

useEffect(()=> {
  setimgCoord();
}, [imgCoord, score]); (1개 이상을 사용하는 것도 가능 하다.)

*/

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState("");
  // -- 한번 변수를 선언 했을 경우 상수로 빼주는 것이 좋은 습관!
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  // componentDidMount, componentDidUpdate 역활 (1대1 대응은 아님)
  useEffect(() => {
    interval.current = setInterval(changeHand, 1000);

    return () => {
      // return 부분이 componentWillUnmount 역활
      clearInterval(interval.current);
    };
  }, [imgCoord]); //두 번째 인수 배열에 넣은 값들이 바뀔 때 useEffect가 통째로 실행.
  // 매번 clearInterval을 하기 때문에 그냥 setTimeout을 하는 것과 동일.

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  // button의 onClick 안에 있는 () => 를 제거할 경우 아래에 추가해줘야 함.
  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore((prevState) => prevState.score + 1);
    } else {
      setResult("졌습니다!");
      setScore((prevState) => prevState.score - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 1000);
    }, 2000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          가위
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}</div>
    </>
  );
};

export default RSP;
