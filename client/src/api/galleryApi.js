import axios from "axios";

export function createExhibition(title, startDate, endDate, type, isClicked, arts) {
  
  return axios.post(
    "https://localhost:5000/exhibition/register",
    {
      title: title,
      startDate: startDate,
      endDate: endDate,
      exhibitType: type,
      genreHashtags: JSON.stringify(isClicked), //배열이니까 JSON 처리
      exibitInfo: arts[0].img, //전시회 content
      images: JSON.stringify(arts) //배열이니까 JSON 처리
    });
}

export function getStandardGallery(){

  return axios.get(
    "https://localhost:5000/exhibition"
    )
    .then((res)=> {
      //여기서 type으로 필터링 한번 하기
    })
}

export function getPremiumGallery(){

  return axios.get(
    "https://localhost:5000/exhibition"
    )
    .then((res)=> {
      //여기서 type으로 필터링 한번 하기
    })
}