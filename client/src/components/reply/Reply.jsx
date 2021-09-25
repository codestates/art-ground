import React from 'react';
import styles from './Reply.module.css';

const Reply = ({ deleteReply, review, userinfo }) => {

  // 로그인 안 했으면 deleteBtn 노출 X
  // 로그인 했으면 내가 쓴 리뷰에만 deleteBtn 표시되도록...!

  return (
    <li className={styles.reply}>
      <div className={styles.imgBox}>
        <img className={styles.profile}src="https://post-phinf.pstatic.net/MjAyMTA0MTJfMTAw/MDAxNjE4MjMwMjQ0Mjcy.UcHomwacpcXaJ8_nUksje4UkxE7UOzZ0gcgdZTnl0eEg.hh6qgDmsklQHWhuV2cyTqb6T0CyRF_IxNxy4RseU95Ag.JPEG/IMG_2379.jpg?type=w1200" alt="profilePic"/>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.userAndDate}>
          <span className={styles.user}>{review.nickname}</span>
          <span className={styles.date}>{review.createdAt}</span> 
        </div>
        <div className={styles.content}>{review.comments}</div>
      </div>
      {userinfo.nickname === review.nickname?
      <span className={styles.deleteBtn} onClick={deleteReply}><i class="fas fa-times"></i></span>
      : null}
    </li>
  )
}

export default Reply;