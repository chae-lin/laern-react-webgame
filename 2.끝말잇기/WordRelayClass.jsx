const React = require("react");
const { Component } = React;

class WordRelayClass extends Component {
  state = {
    word: "제로초",
    value: "",
    result: "",
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: "딩동댕",
        word: this.state.value,
      });
    } else {
      this.setState({
        result: "땡",
      });
    }

    this.input.focus();
    this.setState({ value: "" });
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word} 꿍꿍따!</div>
        <form onSubmit={this.onSubmit}>
          {/* value와 onChangesms 세트로 사용되어야한다.
          그게 아니라면 defaultValue를 적어줘야한다. */}
          <input
            ref={this.onRefInput}
            type="text"
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

module.exports = WordRelayClass;
