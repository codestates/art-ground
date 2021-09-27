import axios from "axios";

export function getMyinfo(setIsLogin, setUserinfo, setisAdmin, isLogin) {
  //art-ground.link

  return axios
    .get("https://localhost:5000/mypage")
    .then((result) => {
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
