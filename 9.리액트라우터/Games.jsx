import React from "react";
import { BrowserRouter, Route, Link, HashRouter } from "react-router-dom";
//StaticRouter: 서버쪽에서 사용

import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    // BrowserRouter: 새로고침시 서버에 응답이 가서 서버에서 값이 없음.
    // HashRouter: 새로고침을 해도 화면이 보임. (서버는 모르고 브라우저만 알고 있음 때문에 실무에서 자주 사용X)
    <BrowserRouter>
      {/* 공통인 부분 : Route 밖 */}
      <div>
        <Link to="/game/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/inddex">게임 매쳐</Link>
      </div>
      {/* 화면이 바뀌는 부분 */}
      <div>
        {/*
        route 매칭사용전 연결 방법

        <Route path="/number-baseball" component={NumberBaseball}></Route>
        <Route path="/rock-scissors-paper" component={RSP}></Route> 
        */}

        {/* 효율적으로 route를 관리할 수 있는 동적 route 매칭 */}
        <Route path="/game/:name" component={GameMatcher}></Route>
      </div>
    </BrowserRouter>
  );
};

export default Games;
