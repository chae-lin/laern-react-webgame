import React, { PureComponent, createRef } from "react";
import Try from "./Try_class";

// this를 사용하지 않을 경우 밖으로 뺄 수 있다.
function getNumbers() {
  // 숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // splice는 특성상 배열을 반환하기 때문에 [0] 첫번째 숫자를 추출하는 식으로 표현
    /*
      splice 
      array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        start : 배열의 변경을 시작할 인덱스
        deleteCount : 배열에서 제거할 요소의 수
        item1, item2, ... : 배열에 추가할 요소
    */
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends PureComponent {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  /*
    - render와 같이 리액트에서 만든 매서드가 아닌 내가 만든 매서드는 화살표함수로 적어줘야한다.
    - 화살표함수를 사용하지 않으면 constructor를 써줘야한다.
      constructor를(props) {
        state = {
          result: "",
          value: "",
          answer: getNumbers(),
          tries: [],
        };
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this); //해당 코드를 추가해줘야 함
      }
    - 화살표 함수를 사용하지 않으면 onSubmitForm() {}; 로 나타낼 수 있으나 this를 사용할 수 없다.
  */
  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join("")) {
      // 홈런인 경우
      this.setState((prevState) => {
        return {
          result: "홈런!",
          // push해버리면 리액트가 뭐가 변화를 일으켰는지 감지할 수 업음
          tries: [...prevState.tries, { try: value, result: "홈런!" }],
        };
      });
      alert("혼럼입니다! 게임을 다시 시작합니다!");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      // 답이 틀린 경우

      // 배열.split : 문자를 배열로 변환
      // parseInt() : 문자열 인자를 구문분석하여 특정 진수의 정수를 반환
      // join() : 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만든다.
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`,
        });
        alert("게임을 다시 시작합니다!");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: value,
                result: `${strike} 스트라이크, ${ball} 볼 입니다. `,
              },
            ],
            value: "",
          };
        });
      }
      this.inputRef.current.focus();
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); // this.inputRef

  /*
  함수 방식은 함수안에 다른 동작을 설정할 수도 있음.

  inputRef;
  onInputRef = (c) => {
    this.inputRef = c;
  }

  사용시: this.inputRef.focus();
  */

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            type="text"
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
          <button>확인</button>
        </form>
        <div>시도: {tries.length}</div>

        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도: `} tryInfo={v} />;
            //분리하는 이유: 성능 최적화, 가독성, 재사용성
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;

/* 
[리액트 반복문 map]
  1. 1개의 값을 넣을 때
    <ul>
      {["사과", "바나나", "포도", "배"].map((v) => {
        return <li>{v}</li>;
      })}
    </ul> 

  2. 2개의 값 넣을 때
  2-1 이차원 배열로 만들어 준다.
    <ul>
      {[
        ["사과", "맛있다"],
        ["바나나", "달다"],
        ["포도", "씨있다"],
        ["배", "맛없다"],
      ].map((v) => {
        return (
          <li>
            <b>
              {v[0]} - {v[1]}
            </b>
          </li>
        );
      })}
    </ul>
  2-2 배열안에 객체로 만들어 준다.
    <ul>
      {[
        { fruit: "사과", taste: "맛있다" },
        { fruit: "바나나", taste: "달다" },
        { fruit: "포도", taste: "씨있다" },
        { fruit: "배", taste: "맛없다" },
      ].map((v) => {
        return (
          <li>
            <b>
              {v.fruit} - {v.taste}
            </b>
          </li>
        );
      })}
    </ul>

[리액트 반복문 key]
  <ul>
    {[
      { fruit: "사과", taste: "맛있다" },
      { fruit: "바나나", taste: "달다" },
      { fruit: "포도", taste: "씨있다" },
      { fruit: "배", taste: "맛없다" },
    ].map((v, i) => {
      return (
        <li key={v.fruit + v.taste}> //꼭 고유한 key값만을 사용해야한다. i(인덱스)를 key로 사용하면 성능최적화시에 문제가 생긴다.
          <b>
            {v.fruit} - {v.taste}
          </b>
        </li>
      );
    })}
  </ul>

[리액트 props]
  - 부모와 자식간에만 props가 교환이 가능하며,
    손자나 증손자 같이 바로 위 컴포넌트에서 물려주는 경우가 아닌 경우엔 redux, context, mobx를 사용한다.
  - 리액트에서는 context가 있고 context를 좀 더 복잡한일을 가능하도록 한 것을 redux로 이해하면 됨.
*/

// 자식이 전부 PureComponent나 memo면 부모도 동일하게 사용가능
