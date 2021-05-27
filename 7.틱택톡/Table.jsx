import React from "react";
import Tr from "./Tr";

const Talbe = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />
        ))}
    </table>
  );
};

export default Talbe;
