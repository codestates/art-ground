import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Main = (props) => {
  return <section>메인 랜딩 페이지
    <Link to='/gallery'>
      <button>전시회 둘러보기</button>
    </Link>
  </section>
}

export default Main;