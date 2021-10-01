import React, { useCallback, useEffect, useState } from 'react';
import Reply from '../../components/reply/Reply';
import styles from './ReviewDetail.module.css';
import { deleteReview, getReplyList, postReview } from '../../api/reviewApi';
import ReviewLogin from '../../components/modals/ReviewLogin';

const ReviewDetail = ({ reviewSelected, isLogin, userinfo }) => {

  //reviewSelected--> 전시회 정보

  const [reply, setReply] = useState('');
  const [loginModal, setLoginModal] = useState(false);

  const [replyList, setReplyList] = useState([]); //랜더링할 데이터(스크롤할 때마다 +)
  const [hiddenReplyList, setHiddenReplyList] = useState([]); //랜더링하기 전 숨겨놓는 데이터(스크롤 할 때마다 -)
  const [replyCount, setReplyCount] = useState([]); //리뷰 개수 랜더링용(스크롤에 상관없이 고정)
  const [isLoading, setIsLoading] = useState(true);

  const [rerender, setRerender] = useState(false);

  const fetchMoreData = async () => {
    if(hiddenReplyList.length !== 0){ //안보여준 댓글이 남아있을 때만
      console.log('데이터 fetch')
      setIsLoading(true);
      setTimeout(()=> {
        setReplyList(replyList.concat(hiddenReplyList.slice(0, 3)));
        setHiddenReplyList(hiddenReplyList.slice(3));
        setIsLoading(false);
      }, 700)
    }
  }

  const _infiniteScroll = useCallback(()=> {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if(scrollTop+clientHeight >= scrollHeight && isLoading === false){
      console.log('스크롤 작동')
      fetchMoreData();
    }
  }, [isLoading])


  const getFetchData = async() => {
    let result = await getReplyList(reviewSelected.id);
    setReplyCount(await getReplyList(reviewSelected.id));//전체 댓글 개수 랜더링
    setReplyList(result.slice(0, 3)); //최초에 3개만 보여주고
    result = result.slice(3);
    setHiddenReplyList(result); //최초 3개 보여줬으니 안 보여준 나머지만 저장.
    setIsLoading(false);
  } 

  useEffect(() => { //해당 전시회의 댓글(배열) GET요청. 페이지최초랜더링(+댓글 등록/삭제)때에만 작동
    setTimeout(()=> {
      getFetchData();
    }, 100)
  }, [rerender])

  useEffect(()=> {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true); 
  }, [_infiniteScroll])


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
          총 {replyCount.length}개</div>
        {replyList.map(el => 
        <Reply
          isLogin={isLogin} 
          reply={el} 
          deleteReply={deleteReply}
          userinfo={userinfo}
        />
        )}
        {isLoading ?
        <div className={styles.loading}>
          <img className={styles.loadingImg} src="../../../images/loading.gif" alt="loading"/>
        </div>
        : null}
      

      </ul>

      {loginModal? (
        <ReviewLogin closeModal={closeModal} />
      ): null}  

    </section> 
  )
}

export default ReviewDetail;