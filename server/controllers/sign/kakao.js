"use strict";
require("dotenv").config();
const axios = require("axios");

module.exports = {
  // 받은 authorization code로 access token 받기
  getToken: (req, res) => {
    const code = req.body.authorizationCode;
    console.log("authcode-----:", code);
    const client_id = process.env.KAKAO_CLIENT_ID;
    const redirect_uri = process.env.KAKAO_REDIRECT_URI;
    const grant_type = process.env.GRANT_TYPE;

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
        // 빋이온 정보로 최초 1회 로그인 시에만 db에 정보 저장
        // 그 이후에는 토큰만 만들어서 보내줌
        res.send(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
