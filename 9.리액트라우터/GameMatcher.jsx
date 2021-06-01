import React, { Component } from "react";
import NumberBaseball from "../3.숫자야구/NumberBaseball_class";
import RSP from "../5.가위바위보/RCP_class";

export default class GameMatcher extends Component {
  render() {
    let urlSearchParams = new URLSearchParams(
      this.props.location.search.slice(1)
    );
    console.log(urlSearchParams.get("hello"));
    if (this.props.match.params.name === "number-baseball") {
      return <NumberBaseball />;
    } else if (this.props.match.params.name === "rock-scissors-paper") {
      return <RSP />;
    }
    return <div>일치하는 게임이 없습니다.</div>;
  }
}
