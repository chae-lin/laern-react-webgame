import React, { memo, useMemo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) =>
          useMemo(
            // useMemo: 컴포넌트 자체를 기억 (최후의 수단과 비슷한 개념)
            () => (
              <Td
                key={i}
                rowIndex={rowIndex}
                cellIndex={i}
                cellData={rowData[i]}
                dispatch={dispatch}
              ></Td>
            ),
            [rowData[i]] // 기억을 헤지할 데이터 (바뀔 여지가 있는 데이터)
          )
        )}
    </tr>
  );
});

export default Tr;
