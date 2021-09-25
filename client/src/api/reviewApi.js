import axios from "axios";

export async function getAllGallery(){ //standard, premium 모든 전시. 승인완료 & 전시마감 모두!

  console.log('REVIEW 내 전시회 목록')
  try {
    const res = await axios.get(
      "https://art-ground.link/review" 
    );
    return res.data.data;
  } catch (err) {
    return console.log(err);
  }  
}


export function getReplyList(postId){

  console.log('댓글 생성/삭제 시 계속 호출 postId:', postId)
  // try {
  //   const res = await axios.get(
  //     `https://art-ground.link/review/${postId}` 
  //   );
  //   return res.data.data;
  // } catch (err) {
  //   return console.log(err);
  // }  
}


export async function postReview(reply, postId){ 

  console.log('REVIEW 등록', reply, postId)
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



export async function deleteReview(replyId){

  console.log('REVIEW 삭제')
  try {
    const res = await axios.delete(
      "https://art-ground.link/review",
      {
        commentsId: replyId
      });
    console.log(res);
  } catch (err) {
    return console.log(err.message);
  }
}