require("dotenv").config();
const { users } = require("../../models");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  // 일반 회원가입
  generalSignUp: async (req, res) => {
    try {
      const { userEmail, password, nickname, userType } = req.body;

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

      const decryptedPassword = JSON.parse(byte.toString(CryptoJS.enc.Utf8));

      // bcrypt 재암호화
      const salt = await bcrypt.genSalt(saltRounds);

      const encryptedPassword = await bcrypt.hash(decryptedPassword, salt);

      const data = await users.findOne({
        where: {
          user_email: userEmail,
        },
      });

      if (data) {
        return res.status(409).json({ message: "email exists" });
      } else {
        await users.create({
          user_email: userEmail,
          password: encryptedPassword,
          nickname: nickname,
          user_type: userType,
        });
        return res.status(201).json({ message: "sign-up ok" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
