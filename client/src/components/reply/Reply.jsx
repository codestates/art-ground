import React from 'react';
import styles from './Reply.module.css';

const Reply = (props) => {
  return (
    <li className={styles.reply}>
      <div className={styles.imgBox}>
        <img className={styles.profile}src="https://post-phinf.pstatic.net/MjAyMTA0MTJfMTAw/MDAxNjE4MjMwMjQ0Mjcy.UcHomwacpcXaJ8_nUksje4UkxE7UOzZ0gcgdZTnl0eEg.hh6qgDmsklQHWhuV2cyTqb6T0CyRF_IxNxy4RseU95Ag.JPEG/IMG_2379.jpg?type=w1200" alt="profilePic"/>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.userAndDate}>
          <span className={styles.user}>춘식이</span>
          <span className={styles.date}>2021-09-14</span> 
        </div>
        <div className={styles.content}>호크니 생애와 세계를 여행한 기분이었다. 
        그의 1950 년대 초 작업부터 가장 최근 작품 중 하나인 2017년 작업까지, 미술적인 다양한 실험을 끊임없이 한 호크니의 세계. 
        런던, LA, 베이루트, 그리고 그의 고향 요크셔를 바라보는 그의 시각. 정교함과 정감이 함께 느껴지던 인물화에서 느껴진 호크니의 사람들. 
        매체의 변화를 다양하게 구사하며 표현한 그의 진화과정. 전시를 보고 나오면서 호크니의 생애를, 그의 시각으로 바라보고 여행한 시공간초월적 경험이었다.
        대표적2인 초상화 3점이 한 전시공간 안에서 입체적으로 구성되어 있는 전시실을 들어섰을 때의 묘한 따스함, 나도 모르게 장엄함에 깊이 빠져들 수 있었던 대형 풍경화...
        세련되었지만 자연스러운 그의 작품. 전시에서 왜 그를 존재자체가 하나의 장르라고 표현했는지, 전시의여운이 진하게 알려주었다.(왕진지)</div>
      </div>
      <span className={styles.deleteBtn}><i class="fas fa-times"></i></span>
    </li>
  )
}

export default Reply;