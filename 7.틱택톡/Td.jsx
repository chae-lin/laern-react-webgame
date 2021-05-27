import React, { useCallback, useEffect, memo, useRef } from "react";
import styled from "styled-components";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  // 어떤게 바뀌고 안바뀌는지 확인
  // false 가 나오면 해당 부분이 바뀌고 있음.
  const ref = useRef([]);
  useEffect(() => {
    console.log(
      rowIndex === ref.current[0],
      cellIndex === ref.current[1],
      dispatch === ref.current[2],
      cellData === ref.current[3]
    );
  }, [rowIndex, cellIndex, dispatch, cellData]);

  // 컴포넌트 안에 넣는 함수들은 useCallback
  const onClick = useCallback(() => {
    console.log(rowIndex, cellIndex);

    if (cellData) {
      return;
    }
    dispatch({
      // 아래를 action 객체로 불르고 dispatch하면 액션 객체를 실행한다.
      // action의 type은 대문자로 하는 것이 community 규칙!
      type: CLICK_CELL,
      row: rowIndex,
      cell: cellIndex,
    });
  }, [cellData]);

  return <TD onClick={onClick}>{cellData}</TD>;
});

const TD = styled.td`
  width: 200px;
  height: 200px;
  border: 1px solid;
`;

export default Td;
