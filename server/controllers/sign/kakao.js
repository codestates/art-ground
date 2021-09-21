"use strict";
require("dotenv").config();
const axios = require("axios");

module.exports = {
  // 받은 authorization code로 access token 받기
  getToken: (req, res) => {
    const code = req.body.authorizationCode;
    const client_id = process.env.KAKAO_CLIENT_ID;
    const redirect_uri = process.env.KAKAO_REDIRECT_URI;
    const grant_type = process.env.GRANT_TYPE;

    axios({
      method: "post",
      url: `https://kauth.kakao.com/oauth/token`,
      data: {
        grant_type,
        client_id,
        redirect_uri,
        code,
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((response) => {
        console.log("tokendata:", response);
        res.send(response.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // 받은 access token으로 사용자 정보 가져오기
  getUserInfo: (req, res) => {
    axios({
      method: "get",
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${req.query.accessToken}`,
      },
    })
      .then((data) => {
        console.log("userInfo:", data);
        res.send(data.data); // data 들어오는 것 보고 수정
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
