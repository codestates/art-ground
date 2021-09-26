import axios from "axios";

export function getSigninRes(userData, handleResponseSuccess) {
  //art-ground.link
  return axios
    .post("https://localhost:5000/sign-in", userData)
    .then((result) => {
      console.log(result.data, "로그인요청 데이터");
      if (result.data === "AccessToken ready") {
        handleResponseSuccess();
      }
    })
    .catch((err) => console.log(err));
}
export function getSignOutRes(setUserinfo, setIsLogin, setisAdmin) {
  //art-ground.link
  return axios
    .post("https://localhost:5000/sign-out")
    .then((result) => {
      console.log(result, "로그아웃응답");
      if (result.status === 205) {
        setUserinfo(null);
        setIsLogin(false);
        setisAdmin(false);
      }
    })
    .catch((err) => console.log(err));
}

export function getSingupAudRes(userData, setErrorMessage, history) {
  return (
    axios
      .post("https://localhost:5000/sign-up/user", userData)
      //.post("https://art-ground.link/sign-up/user", userData)
      .then((result) => {
        if (result.data.message === "sign-up ok") {
          console.log(result, "가입요청 관람객 응답데이터");
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
      .post("https://localhost:5000/sign-up/author", userData)
      //.post("https://art-ground.link/sign-up/author", userData)
      .then((result) => {
        if (result.data.message === "sign-up ok") {
          console.log(result, "작가 관람객 응답데이터");
          history.push("/about");
        }
      })
      .catch((err) => {
        setErrorMessage("이미 존재하는 사용자입니다.");
      })
  );
}
