import axios from "axios";

export function createExhibition(title, startDate, endDate, type, content, isClicked, arts) {
  
  return axios.post(
    "https://localhost:5000/exhibition/register",
    {
      title: title,
      startDate: startDate,
      endDate: endDate,
      exhibitType: type,
      genreHashtags: JSON.stringify(isClicked), //배열이니까 JSON 처리
      exibitInfo: content,
      images: JSON.stringify(arts) //배열이니까 JSON 처리
    });
}

export function getStandardGallery(){

  return axios.get(
    "https://localhost:5000/exhibition" //파라미터 요청
    )
    .then((res)=> {
      
    })
}

export function getPremiumGallery(){

  return axios.get(
    "https://localhost:5000/exhibition" //파라미터 요청
    )
    .then((res)=> {
      
    })
}