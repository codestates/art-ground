require("dotenv").config();
const { users } = require("../../models");
const {
  generateAccessToken,
  sendAccessToken,
} = require("../../utils/tokenFunction");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  signIn: async (req, res) => {
    const { userEmail, password } = req.body;
    console.log(userEmail, password);
    try {
      const userInfo = await users.findOne({
        where: {
          user_email: userEmail,
        },
      });
      if (!userInfo) {
        return res.status(401).json({ message: "invalid user" }); //404로 바꿔야 하나?
      }
      let byte = CryptoJS.AES.decrypt(
        password,
        process.env.ART_GROUND_CRYPTOJS_SECRETKEY
      );
      console.log("byte:", byte);

      let decodedPassword = await JSON.parse(byte.toString(CryptoJS.enc.Utf8));
      console.log("decoded:", decodedPassword);
      // console.log("data:", data.dataValues);
      const validPassword = await bcrypt.compare(
        decodedPassword,
        userInfo.dataValues.password
      );
      console.log("validpw:", validPassword);

      if (validPassword) {
        delete userInfo.dataValues.password;
        console.log("data:", userInfo.dataValues);
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken);
      } else {
        return res.status(401).json({ message: "invalid user" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  signOut: (req, res) => {
    try {
      res
        .clearCookie("accessToken", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 5 * 60,
          path: "/",
          domain: "art-ground.link",
        })
        .status(205)
        .json({ message: "successfully signed out!" });
    } catch {
      res.status(500).json({ message: "server error" });
    }
  },
  // 일반 회원가입
  generalSignUp: async (req, res) => {
    /* 
        1. body값에서 user_email, password, nickname, user_type 구조분해 할당으로 받기
        2. 파라미터 중에서 하나라도 빠지면 422
        3. 아니라면 findOrCreate로 db에 유저 정보 저장 (패스워드는 암호화된 상태로 저장)
        4. 이미 존재하는 이메일이라면 409
        5. 201 ok
        */
    try {
      const { userEmail, password, nickname, userType } = req.body;
      console.log(userEmail, password, nickname, userType);

      if (!userEmail || !password || !nickname || !userType) {
        return res
          .status(422)
          .json({ message: "insufficient parameters supplied" });
      }
      // password 암호화 작업
      // cryptojs 복호화
      let byte = CryptoJS.AES.decrypt(
        password,
        process.env.ART_GROUND_CRYPTOJS_SECRETKEY
      );
      console.log("byte:", byte);
      const decryptedPassword = JSON.parse(byte.toString(CryptoJS.enc.Utf8));
      console.log("password:", decryptedPassword);
      // bcrypt 재암호화
      const salt = await bcrypt.genSalt(saltRounds);
      console.log("salt:", salt);
      const encryptedPassword = await bcrypt.hash(decryptedPassword, salt);
      console.log("encrypted:", encryptedPassword);

      const data = await users.findOne({
        where: {
          user_email: userEmail,
        },
      });
      console.log("data:", data);
      if (data) {
        return res.status(409).json({ message: "email exists" });
      } else {
        const info = await users.create({
          user_email: userEmail,
          password: encryptedPassword,
          nickname: nickname,
          user_type: userType,
        });
        console.log("info:", info);
        return res.status(201).json({ message: "sign-up ok" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 작가 회원가입
  authorSignUp: async (req, res) => {
    try {
      const { authorEmail, password, name, userType } = req.body;
      console.log(authorEmail, password, name, userType);

      if (!authorEmail || !password || !name || !userType) {
        return res
          .status(422)
          .json({ message: "insufficient parameters supplied" });
      }
      // password 암호화 작업
      // cryptojs 복호화
      let byte = CryptoJS.AES.decrypt(
        password,
        process.env.ART_GROUND_CRYPTOJS_SECRETKEY
      );
      console.log("byte:", byte);
      const decryptedPassword = JSON.parse(byte.toString(CryptoJS.enc.Utf8));
      console.log("password:", decryptedPassword);
      // bcrypt 재암호화
      const salt = await bcrypt.genSalt(saltRounds);
      console.log("salt:", salt);
      const encryptedPassword = await bcrypt.hash(decryptedPassword, salt);
      console.log("encrypted:", encryptedPassword);
      // time stamp 시간이 한국 시간이 아닌듯..?
      // async await으로 리팩토링 진행 중
      const data = await users.findOne({
        where: {
          user_email: authorEmail,
        },
      });
      console.log("data:", data);
      if (data) {
        return res.status(409).json({ message: "email exists" });
      } else {
        const info = await users.create({
          user_email: authorEmail,
          password: encryptedPassword,
          nickname: name,
          user_type: userType,
        });
        console.log("info:", info);
        return res.status(201).json({ message: "sign-up ok" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
