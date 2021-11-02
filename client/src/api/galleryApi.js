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
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/exhibition/register`,
      {
        title: title,
        startDate: startDate,
        endDate: endDate,
        exhibitType: type,
        genreHashtags: JSON.stringify(isClicked),
        exhibitInfo: content,
        images: JSON.stringify(arts), //작품 9개
      }
    );
  } catch (err) {
    return console.log(err.message);
  }
}

export async function getStandardGallery(tagClicked, sortValue) {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/exhibition/1` //파라미터 요청(standard) & 승인이 된 것만(status=1)
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

export async function getPremiumGallery(tagClicked, sortValue) {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/exhibition/2` //파라미터 요청(standard) & 승인이 된 것만(status=1)
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

export async function getExhibitionInfo(postId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/exhibition/detail/${postId}`
    );
    return {
      ...res.data.data,
      genre_hashtags: JSON.parse(res.data.data.genre_hashtags),
    };
  } catch (err) {
    return console.log(err);
  }
}

export async function getLikesInfo(postId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/exhibition/like/${postId}`
    );
    //console.log(res.data)
    return res.data;
  } catch (err) {
    return console.log(err);
  }
}

export async function createLike(postId, exhibitionType) {
  try {
    await axios.post(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/exhibition/like`,
      {
        postId: postId,
        type: exhibitionType,
      }
    );
  } catch (err) {
    return console.log(err);
  }
}

export async function deleteLike(postId, exhibitionType) {
  try {
    await axios.delete(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/exhibition/like/${postId}/${exhibitionType}`
    );
  } catch (err) {
    return console.log(err);
  }
}

