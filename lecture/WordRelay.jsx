const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {
    text: "Hello",
  };

  render() {
    return <div>{this.state.text}</div>;
  }
}

// 노드 모듈 시스템으로 쪼갠 파일을 밖에서도 사용할 수 있도록
module.exports = WordRelay;
