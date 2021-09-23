"use strict";
require("dotenv").config();
const axios = require("axios");

module.exports = {
  // 받은 authorization code로 access token 받기
  getToken: (req, res) => {
    const code = req.body.authorizationCode;
    console.log("authcode-----:", code);
    const client_id = process.env.ART_GROUND_KAKAO_CLIENT_ID;
    const redirect_uri = process.env.ART_GROUND_KAKAO_REDIRECT_URI;
    const grant_type = process.env.ART_GROUND_GRANT_TYPE;

    axios({
      method: "post",
      url: `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((response) => {
        console.log("tokendata:", response.data);
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // 받은 access token으로 사용자 정보 가져오기
  getUserInfo: (req, res) => {
    console.log("token:", req.query.accessToken);
    axios({
      method: "get",
      url: `https://kapi.kakao.com/v2/user/me?access_token=${req.query.accessToken}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((data) => {
        console.log("userInfo:", data);
        res.send(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
