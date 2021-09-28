"use strict";
require("dotenv").config();
const axios = require("axios");
const { users } = require("../../models");
const { generateAccessToken } = require("../../utils/tokenFunction");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
  getUserInfo: async (req, res) => {
    console.log("token:", req.query.accessToken);
    try {
      const userInfo = await axios({
        method: "get",
        url: `https://kapi.kakao.com/v2/user/me?access_token=${req.query.accessToken}`,
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      console.log("userInfo:", userInfo.data);

      const nickname = userInfo.data.kakao_account.profile.nickname;
      console.log("nickname:", nickname);

      let password = userInfo.data.id + nickname;

      console.log("password:", password);

      const salt = await bcrypt.genSalt(saltRounds);

      console.log("salt:", salt);
      password = await bcrypt.hash(password, salt);
      console.log("password_2:", password);

      const result = await users.findOne({
        where: {
          user_email: userInfo.data.kakao_account.email || nickname, // 이메일 동의하지 않은 유저는 닉네임으로 저장
        },
      });
      // 이미 회원가입이 되어 있다면 accessToken 만들어서 보내고 로그인
      if (result) {
        console.log("result:", result.dataValues);
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
        const generatedInfo = await users.create({
          user_email: userInfo.data.kakao_account.email || nickname,
          password: password,
          nickname: nickname,
          user_type: 1,
          login_type: "kakao",
        });
        console.log("generatedInfo:", generatedInfo);
        delete generatedInfo.dataValues.password;
        const accessToken = generateAccessToken(generatedInfo.dataValues);
        return res
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 24 * 1000,
            domain: "art-ground.link",
            path: "/",
            ovewrite: true,
          })
          .status(201)
          .json({ data: generatedInfo.dataValues, message: "created ok" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
