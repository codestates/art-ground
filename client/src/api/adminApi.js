import axios from "axios";

export function getAllExhibition(setExhibitData) {
  //art-ground.link
  return axios
    .get("https://art-ground.link/exhibition")
    .then((result) => {
      //console.log(result.data.data);
      setExhibitData(result.data.data);
      //console.log(result.data.data);
    })
    .catch((err) => console.log(err));
}

//전시승인 path="modals/confirmModal"
export function confirmExhibition(setConfirmModal, el) {
  //art-ground.link
  return axios
    .post("https://art-ground.link/admin/exhibition", {
      postId: el.id,
    })
    .then((result) => {
      setConfirmModal(false);
      window.location.href = "https://art-ground.io/admin";
    })
    .catch((err) => console.log(err));
}
//전시마감 path="modals/confirmModal"
export function deleteExhibition(setConfirmModal, el) {
  //art-ground.link
  return axios
    .delete(`https://art-ground.link/admin/exhibition/${el.id}`)
    .then((result) => {
      console.log(result, ":삭제 데이터 ????");
      setConfirmModal(false);
      window.location.href = "https://art-ground.io/admin";
    })
    .catch((err) => console.log(err));
}

export function getAllReviews(setReviewData) {
  //art-ground.link
  return axios
    .get("https://art-ground.link/admin/review")
    .then((result) => {
      //console.log(result.data.data);
      setReviewData(result.data.data);
      //console.log(result.data.data, "ssssssssss");
    })
    .catch((err) => console.log(err));
}

//리뷰 무한스크롤(사용할경우)
export function getinfiniteData(setProductList, preItems, items, productList) {
  //art-ground.link
  return axios
    .get("https://art-ground.link/admin/review")
    .then((res) => {
      let result = res.data.data.slice(preItems, items);
      setProductList([...productList, ...result]);
    })
    .catch((err) => console.log(err));
}

//리뷰삭제 path="modals/reviewdelModal"
export function deleteReviews(setDeleteModal, el) {
  //art-ground.link
  return axios
    .delete(`https://art-ground.link/admin/review/${el.id}`)
    .then((result) => {
      if (result.data.message === "successfully delete comments") {
        setDeleteModal(false);
        window.location.href = "https://art-ground.io/admin";
      }
    })
    .catch((err) => console.log(err));
}
