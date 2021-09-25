import axios from "axios";

export function createExhibition(
  title,
  startDate,
  endDate,
  type,
  content,
  isClicked,
  arts
) {
  return axios
    .post("https://localhost:5000/exhibition/register", {
      title: title,
      startDate: startDate,
      endDate: endDate,
      exhibitType: type,
      genreHashtags: JSON.stringify(isClicked), //해시태그 카테고리(배열)
      exhibitInfo: content,
      images: JSON.stringify(arts), //작품 9개
      // arts = [{title: , content: , subContent: ,img: }, {}, ... , {}]
      // arts[0].img
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}

export function getUnauthorizedEx() {
  //승인 대기중인 전시회만(1status = 0)
  // return axios.get(
  //   "https://localhost:5000/exhibition"
  //   )
  //   .then((res)=> {
  //   })
}

export function getStandardGallery() {
  console.log("standard gallery");
  // return axios.get(
  //   "https://localhost:5000/exhibition" //파라미터 요청 & 승인이 된 것만
  //   )
  //   .then((res)=> {

  //   })
}

export function getPremiumGallery() {
  console.log("premium gallery");
  // return axios.get(
  //   "https://localhost:5000/exhibition" //파라미터 요청 & 승인이 된 것만
  //   )
  //   .then((res)=> {

  //   })
}

export function createLike() {
  console.log("createLike");
}

export function deleteLike() {
  console.log("deleteLike");
}

export function sort(galleryList, sortValue, isStandard) {
  console.log("정렬 테스트중", galleryList, sortValue, isStandard);
  // if(value==='최신순'){
  //   let result = galleryList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  //   result = result.map((el) => {
  //     return {
  //       ...el, tags: JSON.parse(el.tags),//파싱 필요한 요소는 모두 나열해야 함
  //     };
  //   })
  // } else if(value==='인기순'){
  //   let result = galleryList.sort((a, b) => (b.likes.length) - (a.likes.length));
  //   result = result.map((el) => {
  //     return {
  //       ...el, tags: JSON.parse(el.tags),
  //     };
  //   })
  // } else{ //전시마감일순
  //   let result = galleryList.sort((a, b) => (b.end_date) - (a.end_date));
  //   result = result.map((el) => {
  //     return {
  //       ...el, tags: JSON.parse(el.tags),
  //     };
  //   })
  // }
}

export function filterByTag(tag, sortValue, isStandard) {
  console.log("태그 필터링 테스트중", tag, sortValue, isStandard);

  // if (tag === "전체") {
  //   axios
  //     .get(
  //       "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post"
  //     )
  //     .then((res) => {
  //       if(sortValue === '최신순'){
  //       let result = res.data.data.sort((a, b) => {
  //         return new Date(b.created_at) - new Date(a.created_at);
  //       });
  //       setFeeds(
  //         result.map((el) => {
  //           return {...el, tags: JSON.parse(el.tags),
  //         }}))
  //       } else if(sortValue==='인기순'){
  //         let result = res.data.data.sort((a, b) => {
  //           return (b.option1_count+b.option2_count) - (a.option1_count+a.option2_count);
  //         });
  //         setFeeds(
  //           result.map((el) => {
  //             return {...el, tags: JSON.parse(el.tags),
  //           }}))
  //       }
  //     });
  // } else {
  //   axios
  //     .get(
  //       "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post"
  //     )
  //     .then((res) => {
  //       let result = res.data.data.sort((a, b) => {
  //         return new Date(b.created_at) - new Date(a.created_at);
  //       }); //최신순으로 정렬
  //       if(sortValue==='인기순'){
  //         result = res.data.data.sort((a, b) => {
  //           return (b.option1_count+b.option2_count) - (a.option1_count+a.option2_count);
  //         })
  //       }
  //       result = result.map((el) => {
  //         return {...el, tags: JSON.parse(el.tags),
  //         };
  //       }); //배열 파싱하고...
  //       result = result.filter((el) => el.tags.includes(tag));
  //       setFeeds(result);
  //     });
  // }
}
