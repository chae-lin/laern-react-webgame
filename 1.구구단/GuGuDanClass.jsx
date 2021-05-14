const React = require("react");
const { Component } = React;

class GuGuDan extends Component {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // 정의된 이벤트를 작동하지 못하게 하는 메서드.
    // <a>,<input>,<textarea>의 기본 동작을 막을 수 있다.
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
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
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = GuGuDan;
