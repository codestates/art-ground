const { Router } = require("express");
const router = Router();
const { getToken, getUserInfo } = require("./sign/google");
const { signIn } = require("./sign/sign.ctrl");

router.post("/receive/token", getToken);
router.get("/receive/userinfo?", getUserInfo);

router.post("/sign-in", signIn);

module.exports = router;
