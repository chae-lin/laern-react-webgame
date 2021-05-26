import React, { PureComponent } from "react";

class RenderTest extends PureComponent {
  state = {
    counteer: 0,
  };

  // 현재의 카운더와 미래의 바뀌는 카운더 값이 같으면 렌더링되지 않도록.
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if (this.state.counteer !== nextState.counteer) {
  //     return true;
  //   }
  //   return false;
  // }

  onClick = () => {
    this.setState({});
  };

  render() {
    console.log("렌더링", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default RenderTest;

/* 
[상태가 변경되어야한 렌더링 되도록_class]
  1. shouldComponentUpdate 사용
  2. PureComponent 로 묶어서 사용 ( Component → PureComponent )

[PureComponent ?]
  shouldComponentUpdat의 기능을 자동으로 구현해둔 컴포넌트로 state에 변경 유무를 따져서 판단함.
  그러나 객체나 배열같은(참조관계)가 있는 경우엔 변경 유무를 제대로 판단하지 못한다.
*/
