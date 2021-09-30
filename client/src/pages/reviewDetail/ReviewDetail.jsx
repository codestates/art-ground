import React, { useEffect, useState } from 'react';
import Reply from '../../components/reply/Reply';
import styles from './ReviewDetail.module.css';
import { deleteReview, getReplyList, postReview } from '../../api/reviewApi';
import ReviewLogin from '../../components/modals/ReviewLogin';

const ReviewDetail = ({ reviewSelected, isLogin, userinfo }) => {

  //reviewSelected--> 전시회 정보

  const [reply, setReply] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  const [replyList, setReplyList] = useState([]);

  const [rerender, setRerender] = useState(false);


  useEffect(() => { //해당 전시회의 댓글(배열) GET요청
    async function getAxiosData(){
      setReplyList(await getReplyList(reviewSelected.id));
      console.log(await getReplyList(reviewSelected.id))
    }
    setTimeout(()=> {
      getAxiosData();
    }, 100)
  }, [rerender])


  const createReply = () => {
    if(isLogin){
      //로그인 했으면 리뷰등록 가능
      postReview(reply, reviewSelected.id);
      setRerender(!rerender); //댓글 컴포넌트 다시 랜더링 시키기 위한 용도
      setReply(''); //댓글 초기화
    } else{
      setLoginModal(true); //로그인 안 했으면 모달 띄우기
    }
  }

  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      createReply();
    }
  }

  const deleteReply = (el) => {
    deleteReview(el);
    setRerender(!rerender); //컴포넌트 다시 랜더링 시키기 위한 용도
  }
  const closeModal = () => {
    setLoginModal(false);
  }
  
  return (
    <section className={styles.container}>
      <div className={styles.artDetail}>
        
        <div className={styles.imgBox}>
          <img className={styles.thumbnail} src={reviewSelected.images[0].image_urls} alt="thumbnail"/>
        </div>

        <div className={styles.metaData}>
          <h2 className={styles.title}>{reviewSelected.title}</h2>
          <div className={styles.metaContent}>
            
            <div className={styles.list}>
              <span className={styles.listDetail}>작가:</span>
              <span className={styles.listDetail}>전시기간:</span>
              <span className={styles.listDetail}>카테고리:</span>
            </div>
            
            <div className={styles.content}>
              <span className={styles.listDetail}>{reviewSelected.author.nickname}</span>
              <span className={styles.listDetail}>{reviewSelected.start_date} ~ {reviewSelected.end_date}</span>
              <div className={styles.tagList}> 
                {JSON.parse(reviewSelected.genre_hashtags).map(el=> <span className={styles.tag}>{el}</span>)}
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
          onChange={(e)=> setReply(e.target.value)}
          onKeyPress={handleKeyPress}
          />
          <button className={styles.replyIcon}
          onClick={createReply}
          >등록</button>
        </div>
        
        <div className={styles.replyCount}>
          총 {replyList.length}개</div>
        {replyList.map(el => 
        <Reply
          isLogin={isLogin} 
          reply={el} 
          deleteReply={deleteReply}
          userinfo={userinfo}
        />
        )}
      

      </ul>

      {loginModal? (
        <ReviewLogin closeModal={closeModal} />
      ): null}  

    </section> 
  )
}

export default ReviewDetail;