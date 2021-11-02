import axios from "axios";
require("dotenv").config();
export function getMyinfo(setUserinfo, setisAdmin) {
  //art-ground.link
  return axios
    .get(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/mypage`)
    .then((result) => {
      //console.log(result, "마이인포 리쥴트 값!!");
      if (result.status === 200) {
        const img =
          result.data.data.profile_img === null
            ? "../../../images/profile.jpeg"
            : result.data.data.profile_img;

        setUserinfo({ ...result.data.data, profile_img: img });
        //console.log(result.data.data.user_type);
        if (result.data.data.user_type === 3) {
          setisAdmin(true);
        }
      }
    })
    .catch((err) => console.log(err));
}

export function getMyExhibition(setMyEx) {
  //art-ground.link
  return axios
    .get(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/mypage/exhibition`)
    .then((result) => {
      //console.log(result.data.data, "전시데이터값");
      setMyEx(result.data.data);
    })
    .catch((err) => console.log(err));
}

export function getMyPickExhibiton(setMyPick) {
  //localhost:5000
  return axios
    .get(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/mypage/like`)
    .then((result) => {
      //console.log(result.data.data, "라이크데이터값");
      setMyPick(result.data.data);
    })
    .catch((err) => console.log(err));
}

export function deleteAccount() {
  //art-ground.link
  return axios
    .delete(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/mypage`)
    .then((result) => {
      if (result.data.message === "successfully deleted") {
        localStorage.removeItem("isLogin");
        //history.push("/about");
        window.location.href = "/about";
      }
    })
    .catch((err) => console.log(err));
}

//infoModify : path = infoModify
export function infoModify(userData, history, setUserinfo) {
  //art-ground.link
  return axios
    .post(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/mypage`, {
      userData,
    })
    .then((result) => {
      if (result.data.message === "profile changed") {
        axios
          .get(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/mypage`)
          .then((result) => {
            setUserinfo(result.data.data);
            history.push("/mypage");
          });
      }
    })
    .catch((err) => console.log(err));
}

//passModify : path = passModify
export function passModify(passData, setModalOpen, history, setErrorMessage) {
  //art-ground.link
  return axios
    .patch(
      `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/mypage/password`,
      passData
    )
    .then((result) => {
      //  console.log(result.data, "비밀번호 수정 데이터 ");
      if (result.data.message === "password successfully updated!") {
        history.push("/mypage");
        setModalOpen(false);
      }
    })
    .catch((err) => {
      setErrorMessage("현재 비밀번호가 틀렸습니다.");
      setModalOpen(false);
    });
}
