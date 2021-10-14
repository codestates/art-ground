import axios from "axios";

export function getAllExhibition(setExhibitData) {
  //art-ground.link
  return axios
    .get(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/exhibition`)
    .then((result) => {
      setExhibitData(result.data.data);
    })
    .catch((err) => console.log(err));
}

//전시승인 path="modals/confirmModal"
export function confirmExhibition(setConfirmModal, el) {
  //art-ground.link

  return axios
    .post(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/admin/exhibition`, {
      //postId: el.id,
      data: el,
    })
    .then((result) => {
      //console.log(result, "새로 뀐 값 ???");
      setConfirmModal(false);
      window.location.href = "https://art-ground.io/admin";
    })
    .catch((err) => console.log(err));
}
//전시마감 path="modals/confirmModal"
export function deleteExhibition(setConfirmModal, el) {
  //art-ground.link/admin/exhibition/:postId/:type
  return axios
    .delete(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/admin/exhibition/${el.id}/${el.exhibit_type}`
    )
    .then((result) => {
      //console.log(result, ":삭제 데이터 ????");
      setConfirmModal(false);
      window.location.href = "https://art-ground.io/admin";
    })
    .catch((err) => console.log(err));
}

export function getAllReviews(setReviewData) {
  //art-ground.link
  return axios
    .get(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/admin/review`)
    .then((result) => {
      setReviewData(result.data.data);
    })
    .catch((err) => console.log(err));
}

export async function getinfiniteData() {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/admin/review`
    );
    return result.data.data;
  } catch (err) {
    return console.log(err);
  }
}

//리뷰삭제 path="modals/reviewdelModal"
export function deleteReviews(setDeleteModal, el) {
  //art-ground.link/admin/review/:postId/:commentId
  return axios
    .delete(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/admin/review/${el.exhibition_id}/${el.id}`
    )
    .then((result) => {
      //postid??
      if (result.data.message === "successfully delete comments") {
        setDeleteModal(false);
        window.location.href = "https://art-ground.io/admin";
      }
    })
    .catch((err) => console.log(err));
}
