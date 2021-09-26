import axios from "axios";

export function getMyinfo(setIsLogin, setUserinfo, setisAdmin) {
  //art-ground.link
  return axios
    .get("https://localhost:5000/mypage")
    .then((result) => {
      if (result.statusText === "OK") {
        setIsLogin(true);
        setUserinfo(result.data.data);
        if (result.data.data.user_type === 3) {
          setisAdmin(true);
        }
      }
    })
    .catch((err) => console.log(err));
}
