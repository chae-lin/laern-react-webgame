const React = require("react");
const { useState, useRef } = React;

const GuGuDan = () => {
  // 변수자리에 배열, 객체를 쓰는 것을 비구조화 할당이라 함
  // state선언방식, setState, ref 부분의 차이가 있다
  // 함수형은 스테이트가 변경되면 함수 전체가 다시 실행되기 때문에 느릴 수 있다
  const [first, setFist] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  onChange = (e) => {
    setValue({ value: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setFist(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setResult(value + "!! 정답입니다.");
    } else {
      setResult("땡!");
    }
    setValue("");
    inputRef.current.focus();
  };

  return (
    <>
      <div>
        {first} * {second} 는?
      </div>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = GuGuDan;
