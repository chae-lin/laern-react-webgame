import React, { Component } from "react";

/*
 클래스 생성주기 
  constructor(and 매서드) -> render -> ref -> componentDidMount 
  (setState/props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate) 
  (부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸)
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

class RSP extends Component {
  state = {
    result: "",
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;

  // 렌더가 처음 실행되고, 성공적으로 실행되었다면 componentDidMount가 실행된다.
  // 컴포넌트의 변경으로 리렌더링 될 경우에는 실행되지 않는다.
  // 여기에 비동기 요청을 많이 한다.
  componentDidMount() {
    this.interval = setInterval(this.changeHand, 1000);
  }

  // 컴포넌트가 제거되기 직전 (부모에 의해 내 컴포넌트가 사라지는 경우)
  // 비동기 요청 정리를 많이 한다. (비동기 요청 후 완료되지 않은 비동기 요청의 경우 이곳에서 정리해줘야 함.)
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // // 리렌더링 후에 실행 (return ture인 경우)
  // componentDidUpdate() {}

  // shouldComponentUpdate(nextProps, nextState, nextContext) {}

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  // button의 onClick 안에 있는 () => 를 제거할 경우 아래에 추가해줘야 함.
  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다.",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다!",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 1000);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        ></div>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            가위
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}</div>
      </>
    );
  }
}

export default RSP;
