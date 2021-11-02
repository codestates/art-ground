import React, { useCallback, useEffect, useState } from 'react';
import Reply from '../../components/reply/Reply';
import styles from './ReviewDetail.module.css';
import { deleteReview, getExhibitionInfo, getReplyList, postReview } from '../../api/reviewApi';
import ReviewLogin from '../../components/modals/ReviewLogin';
import ReviewArtInfo from '../../components/reviewArtInfo/ReviewArtInfo';
import { withRouter } from 'react-router';
import GalleryModal from '../../components/modals/GalleryModal';

const ReviewDetail = ({ isLogin, userinfo, location }) => {

  const [exhibitionInfo, setExhibitionInfo] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const [reply, setReply] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  const [premiumModal, setPremiumModal] = useState(false);

  const [replyList, setReplyList] = useState([]); //랜더링할 데이터(스크롤할 때마다 +)
  const [hiddenReplyList, setHiddenReplyList] = useState([]); //랜더링하기 전 숨겨놓는 데이터(스크롤 할 때마다 -)
  const [replyCount, setReplyCount] = useState([]); //리뷰 개수 랜더링용(스크롤에 상관없이 고정)
  const [isLoading, setIsLoading] = useState(true); //무한스크롤 시 댓글 로딩
  const [pageLoading, setPageLoading] = useState(true);

  const [rerender, setRerender] = useState(false);

  const fetchMoreData = async () => { //댓글 더 추가로 받아오는 함수
    if(hiddenReplyList.length !== 0){ //안보여준 댓글이 남아있을 때만
      setIsLoading(true);
      setTimeout(()=> {
        setReplyList(replyList.concat(hiddenReplyList.slice(0, 3)));
        setHiddenReplyList(hiddenReplyList.slice(3));
        setIsLoading(false);
      }, 700)
    }
  }

  const _infiniteScroll = useCallback(()=> { //스크롤 높이 및 정도 감지하여, 조건 만족하면 fetchMoreData함수 호출
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if(scrollTop+clientHeight >= scrollHeight && isLoading === false){
      fetchMoreData();
    }
  }, [isLoading])


  const getFetchData = async() => { //해당 전시회의 댓글(배열) GET요청. 페이지최초랜더링(+댓글 등록/삭제)때에만 작동
    setIsLoading(true);
    let result = await getReplyList(Number(location.pathname.substring(14)));
    setReplyCount(await getReplyList(Number(location.pathname.substring(14))));//전체 댓글 개수 랜더링
    setReplyList(result.slice(0, 4)); //최초에 4개만 보여주고
    result = result.slice(4); //보여준 4개 제외한 나머지만 추려서
    setHiddenReplyList(result); //상태값에 저장
    setIsLoading(false);
  } 

  useEffect(() => { //해당 전시회의 댓글(배열) GET요청. 페이지최초랜더링(+댓글 등록/삭제)때에만 작동
    setTimeout(()=> {
      getFetchData();
    }, 300)
  }, [rerender])

  useEffect(()=> {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true); 
  }, [_infiniteScroll])

  useEffect(()=> {
    async function getInfo() {
      const result = await getExhibitionInfo(Number(location.pathname.substring(14)))
      setExhibitionInfo(result.exhibitionData)
      //console.log(result.exhibitionData)
      setThumbnail(result.thumbnail)
    }
    getInfo();
    setTimeout(()=> {
      setPageLoading(false);
    }, 1000)
  }, [])


  const createReply = () => {
    if(isLogin){
      //로그인 했으면 리뷰등록 가능
      postReview(reply, Number(location.pathname.substring(14))); 
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

  const deleteReply = (postId, commentsId) => {
    deleteReview(postId, commentsId);
    setRerender(!rerender); //컴포넌트 다시 랜더링 시키기 위한 용도
  }


  if(pageLoading){
    return (
      <section className={styles.container}>
        <div className={styles.mainLoading}>
          <img className={styles.mainLoadingImg} src="../../../images/loading.gif" alt="loading"/>
        </div>
      </section>
    )
  }else{
  return ( 
    <section className={styles.container}>
      <ReviewArtInfo 
      isLogin={isLogin}
      reviewSelected={exhibitionInfo}
      thumbnail={thumbnail}
      handleModalPremium={() => setPremiumModal(true)}
      />

      <span className={styles.review}>리뷰</span>
      
      <ul className={styles.replies}>
        <div className={styles.replyBox}>
          <input className={styles.reply} 
          placeholder={isLogin ? "리뷰를 작성해주세요." : "로그인하셔야 리뷰를 작성할 수 있습니다."} 
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
          key={el.id}
          isLogin={isLogin} 
          reply={el} 
          deleteReply={deleteReply}
          reviewSelected={exhibitionInfo}
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
        <ReviewLogin closeModal={() => setLoginModal(false)} />
      ): null} 

      {premiumModal? (
        <GalleryModal 
        premiumBlocked={premiumModal}
        closeModal={() => setPremiumModal(false)} />
      ): null} 

    </section> 
  )
  }
}

export default withRouter(ReviewDetail);