import React, { useState, useRef } from 'react';
import styles from './SubNavBar.module.css';

const SubNavBar = (props) => {

  const tags=['전체', '#회화', '#일러스트', '#순수미술', '#응용미술', '#판화', '#개인전', '#사진전', '#추상화', '#팝아트', '#인물화', '#풍경화', '#정물화'];
  const [tagClicked, setTagClicked] = useState('전체');
  const [isStandard, setIsStandard] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  
  const tagHandle = (el) => {
    setTagClicked(el);
  }
  const standardHandle = () => {
    setIsStandard(!isStandard);
    setIsPremium(!isPremium)
  }

  ///////////마우스 드래그로 좌우 스크롤 구현/////////////////////////////////////////////////////////////////////////////////////////////////
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

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
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
  
      scrollRef.current.scrollLeft = startX - e.pageX;
  
      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const throttle = (func, ms) => {
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
        <span className={isStandard? styles.subMenuClicked : styles.subMenu} onClick={standardHandle}>STANDARD</span>
        <span className={isPremium? styles.subMenuClicked : styles.subMenu} onClick={standardHandle}>PREMIUM</span>
      </div>
      <div className={styles.categories}
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}>
        {tags.map(el => <span className={el===tagClicked? styles.hashtagClicked :styles.hashtag} onClick={()=>tagHandle(el)}>{el}</span>)}
      </div>
      <div className={styles.sortWrap}>
        <select className={styles.sort} >
          <option value="최신순">최신순</option>
          <option value="인기순">전시마감일순</option>
        </select>
      </div>


    </section>
  )
}

export default SubNavBar;