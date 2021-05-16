const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
    } else {
      setResult("땡!");
    }

    inputRef.current.focus();
    setValue("");
  };

  onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word} 꿍꿍따!</div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" value={value} onChange={onChange} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
