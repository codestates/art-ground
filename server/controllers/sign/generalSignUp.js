require("dotenv").config();
const { users } = require("../../models");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const { signUpCaching } = require("../../utils/customFunction");
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

      let byte = CryptoJS.AES.decrypt(
        password,
        process.env.ART_GROUND_CRYPTOJS_SECRETKEY
      );

      const decryptedPassword = JSON.parse(byte.toString(CryptoJS.enc.Utf8));

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
        const info = await users.create({
          user_email: userEmail,
          password: encryptedPassword,
          nickname: nickname,
          user_type: userType,
        });

        const data = info.dataValues;
        await signUpCaching(data);
        return res.status(201).json({ message: "sign-up ok" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
//
