import axios from "axios";

export async function getAllGallery(sortValue, search) {
  //standard, premium 모든 전시. 승인완료 & 전시마감 모두!

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/review`
    );
    if (search === "") {
      //검색 안 할 때
      if (sortValue === "최신순") {
        return res.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ).reverse();
      } else {
        //인기순
        return res.data.data.sort(
          (a, b) => b.comments.length - a.comments.length
        );
      }
    } else {
      //검색
      let result = res.data.data.filter((el) => {
        return el.title.toLowerCase().includes(search.toLowerCase());
      });
      result = result.concat(
        res.data.data.filter((el) => {
          return el.author.nickname
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      );
      result = result.filter(
        (arr, index, callback) =>
          index === callback.findIndex((t) => t.id === arr.id)
      );

      if (sortValue === "최신순") {
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ).reverse();
      } else {
        //인기순
        return result.sort((a, b) => b.comments.length - a.comments.length);
      }
    }
  } catch (err) {
    return console.log(err);
  }
}

export async function getReplyList(postId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/review/${postId}`
    );
    return res.data.commentsData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ).reverse();
  } catch (err) {
    return console.log(err);
  }
}
export async function getExhibitionInfo(postId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/review/${postId}`
    );
    const exhibitionData = {
      ...res.data.exhibitionData,
      genre_hashtags: JSON.parse(res.data.exhibitionData.genre_hashtags),
    };
    const thumbnail = res.data.thumbnail[0].image_urls;
    return {
      exhibitionData: exhibitionData,
      thumbnail: thumbnail,
    };
  } catch (err) {
    return console.log(err);
  }
}

export async function postReview(reply, postId) {
  try {
    await axios.post(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/review`, {
      postId: postId,
      comments: reply,
    });
    //console.log(res);
  } catch (err) {
    return console.log(err);
  }
}

export async function deleteReview(postId, commentsId) {
  try {
    await axios.delete(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/review/${postId}/${commentsId}`
    );
    //console.log(postId, commentsId);
  } catch (err) {
    return console.log(err);
  }
}
