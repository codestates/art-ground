import axios from "axios";

export async function createExhibition(
  title,
  startDate,
  endDate,
  type,
  content,
  isClicked,
  arts
) {
  try {

    await axios.post(
      "https://localhost:5000/exhibition/register",
      {
        title: title,
        startDate: startDate,
        endDate: endDate,
        exhibitType: type,
        genreHashtags: JSON.stringify(isClicked),
        exhibitInfo: content,
        images: JSON.stringify(arts), //작품 9개
        // arts = [{title: , content: , subContent: ,img: }, {}, ... , {}]
        // arts[0].img
      }
    );

    //console.log(res);
  } catch (err) {
    return console.log(err.message);
  }
}

export async function getStandardGallery(tagClicked, sortValue) {
  try {
    let res = await axios.get(
      "https://localhost:5000/exhibition/1" //파라미터 요청(standard) & 승인이 된 것만(status=1)
    );

    let result = res.data.data.map((el) => {
      return { ...el, genre_hashtags: JSON.parse(el.genre_hashtags) };
    }); // 배열 파싱하고
    if (tagClicked === "전체") {
      if (sortValue === "최신순") {
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else {
        //전시마감일순
        return result.sort(

          (a, b) => new Date(a.end_date) - new Date(b.end_date)
        );
      }
    } else {
      //태그 필터링

      result = result.filter((el) => el.genre_hashtags.includes(tagClicked));
      if (sortValue === "최신순") {
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

      } else {
        //전시마감일순
        return result.sort(
          (a, b) => new Date(a.end_date) - new Date(b.end_date)
        );
      }
    }
  } catch (err) {
    return console.log(err.message);
  }
}

export async function getPremiumGallery(tagClicked, sortValue) {
  try {
    let res = await axios.get(
      "https://localhost:5000/exhibition/2" //파라미터 요청(standard) & 승인이 된 것만(status=1)
    );

    let result = res.data.data.map((el) => {
      return { ...el, genre_hashtags: JSON.parse(el.genre_hashtags) };
    }); // 배열 파싱하고
    if (tagClicked === "전체") {
      if (sortValue === "최신순") {
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else {
        //전시마감일순
        return result.sort(
          (a, b) => new Date(a.end_date) - new Date(b.end_date)
        );
      }
    } else {
      //태그 필터링
      result = result.filter((el) => el.genre_hashtags.includes(tagClicked));
      if (sortValue === "최신순") {
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

      } else {
        //전시마감일순
        return result.sort(
          (a, b) => new Date(a.end_date) - new Date(b.end_date)
        );
      }
    }
  } catch (err) {
    return console.log(err);
  }
}

export async function filter(isStandard, tagClicked, sortValue) {
  try {
    if (isStandard) { //standard
      let res = await axios.get(
        "https://localhost:5000/exhibition/1" 
      );
      let result = res.data.data.map((el) => {
        return { ...el, genre_hashtags: JSON.parse(el.genre_hashtags) };
      }); // 배열 파싱하고
      if(tagClicked === '전체'){
        if (sortValue === "최신순") {
          return result.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else {
          //전시마감일순
          return result.sort(
            (a, b) => new Date(a.end_date) - new Date(b.end_date)
          );
        }
      } else{
        result = result.filter((el) => el.genre_hashtags.includes(tagClicked));
        if (sortValue === "최신순") {
          return result.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
  
        } else {
          //전시마감일순
          return result.sort(
            (a, b) => new Date(a.end_date) - new Date(b.end_date)
          );
        }
      }
    } else { //premium
      let res = await axios.get(
        "https://localhost:5000/exhibition/2" 
      );
      let result = res.data.data.map((el) => {
        return { ...el, genre_hashtags: JSON.parse(el.genre_hashtags) };
      }); // 배열 파싱하고
      if(tagClicked === '전체'){
        if (sortValue === "최신순") {
          return result.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else {
          //전시마감일순
          return result.sort(
            (a, b) => new Date(a.end_date) - new Date(b.end_date)
          );
        }
      } else{
        result = result.filter((el) => el.genre_hashtags.includes(tagClicked));
        if (sortValue === "최신순") {
          return result.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
  
        } else {
          //전시마감일순
          return result.sort(
            (a, b) => new Date(a.end_date) - new Date(b.end_date)
          );
        }
      }
    }
    
  } catch (err) {
    return console.log(err);
  }
}

export async function sort(sortValue, galleryList) {
  try {
    if (sortValue === "최신순") {
      let result = galleryList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return [...result]
    } else { //전시마감일순
      let result = galleryList.sort(
        (a, b) => new Date(a.end_date) - new Date(b.end_date)
      );
      return [...result]
    }
    
  } catch (err) {
    return console.log(err);
  }
}

export async function createLike(postId) {
  //console.log("클릭한 전시회 아이디:", postId);
  try {
    await axios.post(
      "https://localhost:5000/exhibition/like",
      {
        postId: postId
      });

    //console.log(res);
  } catch (err) {
    return console.log(err);
  }
}

export async function deleteLike(postId) {
  //console.log("클릭한 전시회 아이디:", postId);
  try {
    await axios.delete(
      `https://localhost:5000/exhibition/like/${postId}`)

    //console.log(res);
  } catch (err) {
    return console.log(err);
  }
}
