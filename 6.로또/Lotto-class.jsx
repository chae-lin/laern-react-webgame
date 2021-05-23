import React, { Component } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false, // 재실행을 위한 스테이트
  };

  timeouts = [];

  runTimeouts = () => {
    console.log("runTimeouts");

    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount(prevProps, prevState) {
    console.log("DidMount");
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("DidUpdate");

    // prevState: 바뀌기 이전의 스테이트가 존재
    // this.state: 바뀐 후의 스테이트가 존재
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    // 컴포넌트가 클리어되지 않은 상태에서 언마운트 되는 경우를 대비하여
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    console.log("onClickRedo");

    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스 숫자</div>
        {bonus && <Ball number={bonus} />}
        {redo && (
          <div>
            <button onClick={this.onClickRedo}>한 번 더!</button>
          </div>
        )}
      </>
    );
  }
}

// 노드 모듈 시스템으로 쪼갠 파일을 밖에서도 사용할 수 있도록
export default Lotto;
