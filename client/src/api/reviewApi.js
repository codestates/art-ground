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

  console.log('REVIEW 상세 페이지 내 댓글 목록. postId:', postId)
  // try {
  //   const res = await axios.get(
  //     `https://art-ground.link/review/${postId}` 
  //   );
  //   return res.data.data;
  // } catch (err) {
  //   return console.log(err);
  // }  
}


export function postReview(reply, postId){ 

  console.log('REVIEW 등록', reply, postId)
}



export function deleteReview(){

  console.log('REVIEW 삭제')
}