import React, { PureComponent } from "react";

class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props;
    /* 
      부모로 받은 props를 바꿔줘야 하는 경우 stat를 새로운 state로 만들어주고 변경.
      state = {
        result: this.props.result,
      }
      const onClick = () => {
        this.setState({
          result: '1',
        })
      }
    */
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>

      /*
        const { tryInfo } = this.props 안쓰는 경우
        <li>
          <div>{this.props.tryInfo.try}</div>
          <div>{this.props.tryInfo.result}</div>
        </li>
      */
    );
  }
}

export default Try;
