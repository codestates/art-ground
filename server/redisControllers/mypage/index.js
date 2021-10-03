require("dotenv").config();
const { isAuthorized } = require("../../utils/tokenFunction");
const { users } = require("../../models");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  getMyInfo: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (userInfo) {
      const { id } = userInfo;
      const result = await users.findOne({
        where: {
          id,
        },
      });
      const data = result.dataValues;
      res.status(200).json({
        data,
      });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
  updatePassword: async (req, res) => {
    /*
        1. 현재 비밀번호, 새로 변경할 비밀번호 req.body로 암호화된 상태로 받기
        2. 토큰 verify, 현재 비밀번호 해독, compare true값 나오면
        3. 새로 변경할 비밀번호 cryptojs로 해독 후 원본 데이터를 bcrypt로 재암호화해서 db에 저장
        */
    try {
      const { currentPassword, newPassword } = req.body;
      const data = isAuthorized(req);
      console.log("data:", data, currentPassword, newPassword);

      const userInfo = await users.findOne({
        where: {
          user_email: data.user_email,
        },
      });
      // current password decode
      let byte = CryptoJS.AES.decrypt(
        currentPassword,
        process.env.ART_GROUND_CRYPTOJS_SECRETKEY
      );
      console.log("byte1:", byte);

      let decodedPassword = await JSON.parse(byte.toString(CryptoJS.enc.Utf8));
      console.log("decoded1:", decodedPassword);

      // compare password
      const validPassword = await bcrypt.compare(
        decodedPassword,
        userInfo.password
      );
      console.log("validpw:", validPassword);

      // password가 유효하면
      if (validPassword) {
        // decode new password
        let byte2 = CryptoJS.AES.decrypt(
          newPassword,
          process.env.ART_GROUND_CRYPTOJS_SECRETKEY
        );
        console.log("byte2:", byte2);

        const decodedPassword2 = await JSON.parse(
          byte2.toString(CryptoJS.enc.Utf8)
        );
        console.log("decoded2:", decodedPassword2);

        // encode new password
        const salt = await bcrypt.genSalt(saltRounds);
        console.log("salt:", salt);
        const encryptedPassword = await bcrypt.hash(decodedPassword2, salt);
        console.log("encrypted:", encryptedPassword);

        const newInfo = await users.update(
          {
            password: encryptedPassword,
          },
          {
            where: {
              user_email: userInfo.user_email,
            },
          }
        );
        console.log("newInfo:", newInfo);
        res.status(200).json({ message: "password successfully updated!" });
      }
      // password가 유효하지 않으면
      else {
        res.status(401).json({ message: "unauthorized" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
//
