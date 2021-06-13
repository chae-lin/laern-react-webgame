import React, { Component } from "react";

class ReponsCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout;
  startTime;
  endTimie;

  onClickScreen = () => {
    const { state } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요.",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "클릭하세요",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (state === "ready") {
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "너무 성급하세요!",
      });
    } else if (state === "now") {
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTimie - this.startTime],
        };
      });
      this.endTimie = new Date();
    }
  };

  onClickReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    return (
      result.length > 0 && (
        <>
          <div>
            평균시간:
            {result.reduce((a, c) => a + c) / result.length}
            ms
          </div>
          <button onClick={this.onClickReset}>리셋하기</button>
        </>
      )
    );
  };

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ReponsCheck;
