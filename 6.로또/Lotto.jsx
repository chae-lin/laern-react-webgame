import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // useMemo: 복잡한 함수 결괏값을 기억
  // useRef: 일반 값을 기억
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // 두번째 배열에 들어간 요소가 변경되지 않는 한 다시 실행되지 않는다.
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      //componentWillUnmount에 해당
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);
  // [] 해당 부분(inputs)이 빈배열이면 기본적으로 componentDidMount와 같다.
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행 (즉 timeouts.current 이 바뀌면 useEffect를 실행한다.)

  // ☆자식컴포넌트에 함수를 넘길때는 useCallback을 꼭 해주어야 한다. ex) <Ball />에 함수 넘길 때
  const onClickRedo = useCallback(() => {
    // useCallback: 함수 자체를 기억
    // 함수컴포넌트는 전체가 재실행되어 함수 자체를 기억해두어 함수컴포넌트가 재실행되어도 해당 함수는 새로 생성되지 않도록
    console.log("onClickRedo");
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]); // 두번째 배열이 변경되면 재실행.

  return (
    <>
      <div>당첨 숫자</div>
      <div>
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스 숫자</div>
      {bonus && <Ball number={bonus} />}
      {redo && (
        <div>
          <button onClick={onClickRedo}>한 번 더!</button>
        </div>
      )}
    </>
  );
};

export default Lotto;

/* 
  Hooks에 대한 TIP
  - 훅스 시리즈들은 순서가 매우 중요하다.
  - 조건문 안에 절대 넣으면 안 되고 함수나 반복문 안에도 웬만하면 넣지 않는 것이 좋다.
  - useEffect, useCallback, useMemo 와 같은 곳에서 useState를 사용하면 안된다.
  - 순서가 확실하게 정해진 반복문안에서는 useState를 넣어도 되긴하나 되도록 넣지 않는 것이 좋다.
  - 실행되는 조건이 다르면 useEffect를 여러번 사용가능하다.

    const mounted = useRef(false);
    useEffect(() => {
      if (!mounted.current) {
        mounted.current = true;
      } else {
        // ajax 요청
      }
    }, [바뀌는 값]); // componentDidMount는 실행X, componentDidUpdate만 실행하고 싶을 때
    // 실행을 막을 순 없으나 실행될 것을 비워주면 된다.
*/
