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
    const res = await axios.post(
      "https://art-ground.link/exhibition/register",
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
    console.log(res);
  } catch (err) {
    return console.log(err.message);
  }
}

export async function getStandardGallery(tagClicked, sortValue) {
  try {
    let res = await axios.get(
      "https://art-ground.link/exhibition/1" //파라미터 요청(standard) & 승인이 된 것만(status=1)
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
      "https://art-ground.link/exhibition/2" //파라미터 요청(standard) & 승인이 된 것만(status=1)
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

export async function createLike(el) {
  console.log("클릭한 전시회 아이디:", el);
  try {
    const res = await axios.post("https://art-ground.link/exhibition/like", {
      postId: el,
    });
    console.log(res);
  } catch (err) {
    return console.log(err);
  }
}

export async function deleteLike(el) {
  console.log("클릭한 전시회 아이디:", el);
  try {
    const res = await axios.delete("https://art-ground.link/exhibition/like", {
      postId: el,
    });
    console.log(res);
  } catch (err) {
    return console.log(err);
  }
}
