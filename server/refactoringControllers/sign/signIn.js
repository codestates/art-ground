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
};
//
