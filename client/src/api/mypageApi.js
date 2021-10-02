import axios from "axios";

export function getMyinfo(setIsLogin, setUserinfo, setisAdmin, isLogin) {
  //art-ground.link
  return axios
    .get("https://art-ground.link/mypage")
    .then((result) => {
      //console.log(result, "마이인포 리쥴트 값!!");
      if (result.status === 200) {
        const img =
          result.data.data.profile_img === null
            ? "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png"
            : result.data.data.profile_img;

        //console.log(isLogin, "로그인값 !!!");
        setIsLogin(true);
        setUserinfo({ ...result.data.data, profile_img: img });
        //console.log(result.data.data);
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
    .get("https://art-ground.link/mypage/exhibition")
    .then((result) => {
      console.log(result.data.data, "전시데이터값");
      setMyEx(result.data.data);
    })
    .catch((err) => console.log(err));
}

export function getMyPickExhibiton(setMyPick) {
  //art-ground.link
  return axios
    .get("https://art-ground.link/mypage/like")
    .then((result) => {
      //console.log(result.data.data, "라이크데이터값");
      setMyPick(result.data.data);
    })
    .catch((err) => console.log(err));
}

export function deleteAccount(setUserinfo, setIsLogin, history) {
  //art-ground.link
  return axios
    .delete("https://art-ground.link/mypage")
    .then((result) => {
      console.log(result, "탈퇴!");
      setUserinfo(null);
      setIsLogin(false);
      history.push("./about");
    })
    .catch((err) => console.log(err));
}

//infoModify
export function infoModify(userData, history) {
  //art-ground.link
  return axios
    .post("https://art-ground.link/mypage", {
      userData,
    })
    .then((result) => {
      console.log(result, "인포수정 응답!");
      if (result.data.message === "profile changed") {
        history.push("/mypage");
        //setEditedRender(!editedRender);
      }
    })
    .catch((err) => console.log(err));
}
