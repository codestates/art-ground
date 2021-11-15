require("dotenv").config();
const { users } = require("../../models");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
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
//
