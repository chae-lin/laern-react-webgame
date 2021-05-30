import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import {
  TableContext,
  CODE,
  OPEN_CELL,
  CLICK_MINE,
  FLAG_CELL,
  NORMALIZE_CELL,
  QUESTION_CELL,
} from "./MineSearch";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: "#444",
      };
    case CODE.OPEND:
      return {
        background: "#fff",
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: "yellow",
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: "red",
      };
    default:
      return {
        background: "#fff",
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICKED_MINE:
      return "펑!";
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "!";
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return "?";
    default:
      return "";
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback(
    (e) => {
      // 오른쪽 클릭시 메뉴가 뜨기 떄문에 preventDefault 해줘야함.
      e.preventDefault();
      if (halted) {
        return;
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex], halted]
  );

  return (
    <TD
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      // 마우스 우클릭 onContextMenu
      onContextMenu={onRightClickTd}
    >
      {getTdText(tableData[rowIndex][cellIndex])}
    </TD>
  );
};

const TD = styled.td`
  width: 30px;
  height: 30px;
  border: 1px solid;
`;

export default Td;
