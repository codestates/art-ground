require("dotenv").config();
const { users } = require("../../models");
const {
  generateAccessToken,
  sendAccessToken,
} = require("../../utils/tokenFunction");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");

module.exports = {
  signIn: async (req, res) => {
    const { userEmail, password } = req.body;
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

      let decodedPassword = await JSON.parse(byte.toString(CryptoJS.enc.Utf8));

      const validPassword = await bcrypt.compare(
        decodedPassword,
        userInfo.dataValues.password
      );

      if (validPassword) {
        delete userInfo.dataValues.password;
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken);
      } else {
        return res.status(401).json({ message: "invalid user" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
