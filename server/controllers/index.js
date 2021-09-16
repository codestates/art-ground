
const { Router } = require("express");
const { sign } = require("./sign");
const { getToken, getUserInfo } = require("./sign/google");

const router = Router();

router.post("/receive/token", getToken);
router.get("/receive/userinfo?", getUserInfo);

module.exports = router;
