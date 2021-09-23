import axios from "axios";

export function createExhibition(title, startDate, endDate, type, content, isClicked, arts) {

  return axios.post(
    "https://localhost:5000/exhibition/register",
    {
      title: title,
      startDate: startDate,
      endDate: endDate,
      exhibitType: type,
      genreHashtags: JSON.stringify(isClicked), //해시태그 카테고리(배열)
      exhibitInfo: content,
      images: JSON.stringify(arts) //작품 9개
      // arts = [{title: , content: , subContent: ,img: }, {}, ... , {}]
      // arts[0].img
    });
}

export function getUnauthorizedEx(){ //승인 대기중인 전시회만(1status = 0)

  // return axios.get(
  //   "https://localhost:5000/exhibition" 
  //   )
  //   .then((res)=> {
      
  //   })
}

export function getStandardGallery(){
  console.log('standard')
  // return axios.get(
  //   "https://localhost:5000/exhibition" //파라미터 요청 & 승인이 된 것만 
  //   )
  //   .then((res)=> {
      
  //   })
}

export function getPremiumGallery(){
  console.log('premium')
  // return axios.get(
  //   "https://localhost:5000/exhibition" //파라미터 요청 & 승인이 된 것만
  //   )
  //   .then((res)=> {
      
  //   })
}