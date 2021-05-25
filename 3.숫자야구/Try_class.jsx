import React, { Component } from "react";

class Try extends Component {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>

      // <li>
      //   <div>{this.props.tryInfo.try}</div>
      //   <div>{this.props.tryInfo.result}</div>
      // </li>
    );
  }
}

export default Try;
