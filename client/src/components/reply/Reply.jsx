import React from 'react';
import styles from './Reply.module.css';

const Reply = ({ deleteReply, reply, isLogin, userinfo, reviewSelected }) => {

  // 로그인 안 했으면 deleteBtn 노출 X
  // 로그인 했으면 내가 쓴 리뷰에만 deleteBtn 표시되도록...!

  return (
    <li className={styles.reply}>
      <div className={styles.imgBox}>
        <img className={styles.profile} 
        src={reply.user.profile_img || "../../../images/profile.jpeg"} 
        alt="profilePic"/>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.userAndDate}>
          <span className={styles.user}>{reply.user.nickname}</span>
          <span className={styles.date}>
            {reply.createdAt.substring(0,10)} {reply.createdAt.substring(11, 16)}
          </span> 
        </div>
        <div className={styles.content}>{reply.comments}</div>
      </div>
      {isLogin && userinfo.id === reply.user.id ?
      <span className={styles.deleteBtn} 
      onClick={() => deleteReply(reviewSelected.id, reply.id)}>
        <i className="fas fa-times"></i>
      </span>
      : null}
    
    </li>
  )
}

export default Reply;