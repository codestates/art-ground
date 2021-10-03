import React, { useState, useRef } from 'react';
import styles from './SubNavBar.module.css';

const SubNavBar = ({ isStandard, tagClicked, handleTagFilter, handleStandard, sortValue, handleSort }) => {

  const tags=['전체', '#회화', '#순수미술', '#응용미술', '#일러스트', '#판화', '#개인전', '#사진전', '#추상화', '#팝아트', '#인물화', '#풍경화', '#정물화'];

  ///////////마우스 드래그로 좌우 스크롤 구현/////////////////////////////////////////////////////////////////////////////////////////////////
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX; 
      //scrollLeft 값을 바꿔주어 돔에 컴포넌트를 실시간으로 보여줌
      
      let { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      if (scrollLeft === 0) { //왼끝이 보이는데 계속 오른쪽으로 드래그할 때
        //console.log('1', e.pageX)//계속 증가
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) { //오른쪽끝이 보이는데 계속 왼쪽으로 드래그할 때
        //console.log('2', e.pageX + scrollLeft)//계속 감소
        setStartX(e.pageX + scrollLeft);
      }

    }
  };

  const throttle = (func, ms) => {//너무 많은 이벤트가 발생하니 250ms마다 이벤트 감지.
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };
  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  return(
    <section className={styles.container}>

      <div className={styles.subNavBar}>
        <span className={isStandard? styles.subMenuClicked : styles.subMenu} 
        onClick={handleStandard}>STANDARD</span>
        <span className={(!isStandard)? styles.subMenuClicked : styles.subMenu} 
        onClick={handleStandard}>PREMIUM</span>
      </div>

      <div className={styles.categories}
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}
      >
        {tags.map(el => 
        <span className={el===tagClicked? styles.hashtagClicked :styles.hashtag}
        key={el} 
        onClick={()=>handleTagFilter(el)}>{el}</span>)}
      </div>

      <div className={styles.sortWrap}>
        <select className={styles.sort} value={sortValue} onChange={handleSort}>
          <option value="최신순">최신순</option>
          <option value="전시마감일순">전시마감일순</option>
        </select>
      </div>


    </section>
  )
}

export default SubNavBar;