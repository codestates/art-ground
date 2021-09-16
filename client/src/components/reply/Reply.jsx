import React from 'react'
import styles from './Reply.module.css'

const Reply = (props) => {
  return (
    <li className={styles.reply}>
      <div className={styles.imgBox}>
        <img className={styles.profile} src='https://post-phinf.pstatic.net/MjAyMTA0MTJfMTAw/MDAxNjE4MjMwMjQ0Mjcy.UcHomwacpcXaJ8_nUksje4UkxE7UOzZ0gcgdZTnl0eEg.hh6qgDmsklQHWhuV2cyTqb6T0CyRF_IxNxy4RseU95Ag.JPEG/IMG_2379.jpg?type=w1200' alt='profilePic' />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.userAndDate}>
          <span className={styles.user}>춘식이</span>
          <span className={styles.date}>2021-09-14</span>
        </div>
        <div className={styles.content}>
          영국에 테이트 미술관이 있다면 우리나라에 서울 시립미술관이 있죠.
          물론 유명도에서는 비교는 불가하지만 고전적인 우리나라의 풍경 속에 서양 거장 화가의 작품을 볼 수 있는 기회가 생겼다는 것이 좋았습니다.
          생존하는 작가이기도 끊임없이 다양한 매체의 시도로 멈춰있지 않고 미래를 향해 끊임없이 전진하고 있는 작가라는 느낌을 받았습니다.
          주말에는 사람들의 줄이 어마어마하니 여유를 가지고 보실 분들은 평일에 가보신 것을 추천합니다.(왕진지)
        </div>
      </div>
      <span className={styles.deleteBtn}><i class='fas fa-times' /></span>
    </li>
  )
}

export default Reply
