import React from 'react';
import { useHistory } from 'react-router';

const Landing = () => {
  const history = useHistory();
  const goAbout = () => {
    history.push('/join');
  };
  return (
    <section onClick={goAbout} style={{ cursor: 'pointer' }}>
      랜딩페이지 클릭하세요(헤더없애기실험)
    </section>
  );
};
export default Landing;
