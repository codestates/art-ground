import axios from "axios";

export async function getAllGallery(sortValue, search){ //standard, premium 모든 전시. 승인완료 & 전시마감 모두!

  console.log('REVIEW 내 전시회 목록')
  try {
    const res = await axios.get(
      "https://art-ground.link/review" 
    );
    if(search === ''){ //검색 안 할 때
      if(sortValue === '최신순'){
        return res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else{ //인기순
        return res.data.data.sort((a, b) => (b.comments.length) - (a.comments.length))
      }
    } else{ //검색
      let result = res.data.data.filter((el) => {
        return el.title.toLowerCase().includes(search.toLowerCase())
      })
      if(sortValue === '최신순'){
        return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else{ //인기순
        return result.sort((a, b) => (b.comments.length) - (a.comments.length))
      }
    }
  } catch (err) {
    return console.log(err);
  }  
}


export async function getReplyList(postId){

  //console.log('댓글 생성/삭제 시 계속 호출 postId:', postId)
  try {
    const res = await axios.get(
      `https://art-ground.link/review/${postId}` 
    );
    return res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    return console.log(err);
  }  
}


export async function postReview(reply, postId){ 

  //console.log('REVIEW 등록', reply, postId)
  try {
    const res = await axios.post(
      "https://art-ground.link/review",
      {
        postId: postId,
        comments: reply
      });
    console.log(res);
  } catch (err) {
    return console.log(err.message);
  }
}



export async function deleteReview(commentsId){

  console.log('REVIEW 삭제')
  try {
    const res = await axios.delete(
      `https://art-ground.link/review/${commentsId}`,
      {
        //commentsId: replyId
      });
    console.log(res);
  } catch (err) {
    return console.log(err.message);
  }
}