import React, { useCallback } from "react";
import styled from "styled-components";
import { CLICK_CELL } from "./TicTacToe";

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
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
};

const TD = styled.td`
  width: 200px;
  height: 200px;
  border: 1px solid;
`;

export default Td;
