import axios from "axios";

export function getSigninRes(userData, handleResponseSuccess, setErrorMessage) {
  //art-ground.link
  return axios
    .post(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/sign-in`, userData)
    .then((result) => {
      if (result.data === "AccessToken ready") {
        handleResponseSuccess(result);
      }
    })
    .catch((err) => setErrorMessage("가입하지 않은 유저입니다."));
}
export function getSignOutRes(setUserinfo, setIsLogin, setisAdmin) {
  //art-ground.link
  return axios
    .post(`${process.env.REACT_APP_DEPOLOY_SERVER_URI}/sign-out`)
    .then((result) => {
      if (result.status === 205) {
        setUserinfo(null);
        setIsLogin(false);
        setisAdmin(false);
        //window.localStorage.setItem("isLogin", false);
        localStorage.removeItem("isLogin");
      }
    })
    .catch((err) => console.log(err.status));
}

export function getSingupAudRes(userData, setErrorMessage, history) {
  return (
    axios
      .post(
        `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/sign-up/user`,
        userData
      )
      //.post("https://art-ground.link/sign-up/user", userData)
      .then((result) => {
        if (result.data.message === "sign-up ok") {
          //console.log(result, "가입요청 관람객 응답데이터");
          history.push("/about");
        }
      })
      .catch((err) => {
        setErrorMessage("이미 존재하는 사용자입니다.");
      })
  );
}

export function getSingupAuthRes(userData, setErrorMessage, history) {
  return (
    axios
      .post(
        `${process.env.REACT_APP_DEPOLOY_SERVER_URI}/sign-up/author`,
        userData
      )
      //.post("https://art-ground.link/sign-up/author", userData)
      .then((result) => {
        if (result.data.message === "sign-up ok") {
          // console.log(result, "작가 관람객 응답데이터");
          history.push("/about");
        }
      })
      .catch((err) => {
        setErrorMessage("이미 존재하는 사용자입니다.");
      })
  );
}
