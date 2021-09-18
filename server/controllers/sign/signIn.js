require("dotenv").config();
const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunction");
const cryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");

module.exports = {
  signIn: (req, res) => {
    const { userEmail, password } = req.body;
    console.log(userEmail, password);
    try {
      users
        .findOne({
          where: {
            user_email: userEmail,
          },
        })
        .then(async (data) => {
          if (!data) {
            return res.status(401).json({ message: "invalid user" }); //404로 바꿔야 하나?
          }
          let byte = cryptoJS.AES.decrypt(
            password,
            process.env.CRYPTOJS_SECRETKEY
          );
          console.log("byte:", byte);

          let decodedPassword = JSON.parse(byte.toString(cryptoJS.enc.Utf8));
          console.log("decoded:", decodedPassword);

          const validPassword = await bcrypt.compare(
            decodedPassword.password,
            data.dataValues.password
          );
          console.log("validpw:", validPassword);

          if (validPassword) {
            delete data.dataValues.password;
            delete data.dataValues.iat;
            // delete data.dataValues.exp;
            const accessToken = generateAccessToken(data.dataValues);
            sendAccessToken(res, accessToken);
          } else {
            return res.status(401).json({ message: "invalid user" });
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
};
