const React = require("react");
const { Component } = React;

class GuGuDan extends Component {
  // Component를 생성할 때 state 값을 초기화하거나 메서드를 바인딩할 때 construcotr()를 사용
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     first: Math.ceil(Math.random() * 9),
  //     second: Math.ceil(Math.random() * 9),
  //     value: "",
  //     result: "",
  //   };
  // }

  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  // 함수를 render 안으로 넣어주면 render될 떄 함수도 계속해서 재실행되어 밖으로 따로 뺴주는 것이 좋다.

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // 정의된 이벤트를 작동하지 못하게 하는 메서드.
    // <a>,<input>,<textarea>의 기본 동작을 막을 수 있다.
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      // 예전값으로 새로운 값을 만들 때 리턴해주는 함수를 사용한다. (이전 스테이트로 새로운 스테이트 생성)
      // parseInt() 함수는 문자열 인자를 구문분석하여 특정 진수의 정수를 반환
      this.setState((prevState) => {
        return {
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          result: prevState.value + "정답입니다.",
        };
      });
    } else {
      this.setState({
        result: "땡!",
      });
    }
    this.setState({
      value: "",
    });
    this.input.focus();
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>
          {this.state.first} * {this.state.second} 는?
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.onRefInput}
            type="number"
            value={this.state.value}
            onChange={this.onChange}
            // onClick, onChange, onSubmit, onLoad, onInput, onFocus, onBlur
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = GuGuDan;
