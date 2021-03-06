"use strict";
require("dotenv").config();
const axios = require("axios");
const { users } = require("../../models");
const { generateAccessToken } = require("../../utils/tokenFunction");
const bcrypt = require("bcrypt");
const { signUpCaching } = require("../../utils/customFunction");
const saltRounds = 10;

module.exports = {
  // 받은 authorization code로 access token 받기
  getToken: (req, res) => {
    const code = req.body.authorizationCode;

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
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // 받은 access token으로 사용자 정보 가져오기
  getUserInfo: async (req, res) => {
    try {
      const userInfo = await axios({
        method: "get",
        url: `https://kapi.kakao.com/v2/user/me?access_token=${req.query.accessToken}`,
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      const nickname = userInfo.data.kakao_account.profile.nickname;

      let password = userInfo.data.id + nickname;

      const salt = await bcrypt.genSalt(saltRounds);

      password = await bcrypt.hash(password, salt);

      const result = await users.findOne({
        where: {
          user_email: userInfo.data.kakao_account.email || nickname, // 이메일 동의하지 않은 유저는 닉네임으로 저장
        },
      });
      // 이미 회원가입이 되어 있다면 accessToken 만들어서 보내고 로그인
      if (result) {
        delete result.dataValues.password;
        const accessToken = generateAccessToken(result.dataValues);
        res
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 24 * 1000,
            domain: "art-ground.link",
            path: "/",
            ovewrite: true,
          })
          .status(200)
          .json({ data: result.dataValues, message: "AccessToken ready" });
      } else {
        // 최초 로그인 시 회원가입 진행
        const userInfo = {
          user_email: userInfo.data.kakao_account.email || nickname,
          password,
          nickname,
          user_type: 1,
          login_type: "kakao",
        };
        const data = (await users.create(userInfo)).dataValues;
        await signUpCaching(data);
        return res
          .cookie("accessToken", generateAccessToken(data), {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 24 * 1000,
            domain: "art-ground.link",
            path: "/",
            ovewrite: true,
          })
          .status(201)
          .json({ data, message: "created ok" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
