import React, { useEffect, useState } from 'react';
import Reply from '../../components/reply/Reply';
import styles from './ReviewDetail.module.css';
import { Link } from 'react-router-dom';
import { deleteReview, getReplyList, postReview } from '../../api/reviewApi';

const ReviewDetail = ({ reviewSelected, isLogin }) => {

  //reviewSelected--> 전시회 정보

  const tags = ['#현대미술', '#일러스트레이션', '#회화']
  const [reply, setReply] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  const [replyList, setReplyList] = useState([]);
  

  useEffect(()=> {
    getReplyList();
    //(+setReplyList에다가 넣기)
  })

  const handleReply = (event) => {
    setReply(event.target.value)
  }
  const createReply = () => {
    if(isLogin){
      //로그인 했으면 리뷰등록 가능
      postReview(reply);
    } else{
      setLoginModal(true); //로그인 안 했으면 모달 띄우기
    }
  }
  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      createReply();
    }
  }

  const deleteReply = () => {
    deleteReview();
  }
  
  return (
    <section className={styles.container}>
      <div className={styles.artDetail}>
        
        <div className={styles.imgBox}>
          <img className={styles.thumbnail} src="https://t1.daumcdn.net/cfile/tistory/99EFE6375A65DFEA33" alt="thumbnail"/>
        </div>

        <div className={styles.metaData}>
          <h2 className={styles.title}>데이비드 호크니展</h2>
          <div className={styles.metaContent}>
            
            <div className={styles.list}>
              <span className={styles.listDetail}>작가:</span>
              <span className={styles.listDetail}>전시기간:</span>
              <span className={styles.listDetail}>카테고리:</span>
            </div>
            
            <div className={styles.content}>
              <span className={styles.listDetail}>데이비드 호크니</span>
              <span className={styles.listDetail}>2021-09-13 ~ 2021-12-31</span>
              <div className={styles.tagList}> 
                {tags.map(el=> <span className={styles.tag}>{el}</span>)}
              </div>
            </div>  

          </div>
        </div>
      </div>
      
      <span className={styles.review}>리뷰</span>
      
      <ul className={styles.replies}>
        
        <div className={styles.replyBox}>
          <input className={styles.reply} 
          placeholder="로그인하셔야 리뷰를 작성할 수 있습니다" 
          type="text" 
          value={reply}
          onChange={handleReply}
          onKeyPress={handleKeyPress}
          />
          <button className={styles.replyIcon}
          onClick={createReply}
          >등록</button>
        </div>

        <div className={styles.replyCount}>총 N개</div>
        <Reply deleteReply={deleteReply}/>
        <Reply deleteReply={deleteReply}/>
        <Reply deleteReply={deleteReply}/>
      </ul>
      {loginModal? (
        <section className={styles.modalContainer}>
          <div className={styles.modalWrap}>
          <span className={styles.modalContent}>리뷰를 작성하려면<br></br>로그인이 필요합니다!</span>
            <p className={styles.modalSubContent}>로그인 페이지로 이동하시겠어요?</p>
            <div className={styles.ok}>
              <Link to="/signin">
                <button className={styles.okBtn}>네</button>
              </Link>
              <button className={styles.okBtn} 
              onClick={()=> setLoginModal(false)}
              >아니오</button>
              
            </div>
          </div>
        </section>
      ): null}  
    </section>
  )  
}

export default ReviewDetail;