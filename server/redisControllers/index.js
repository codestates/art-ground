// router.use(endpoint, directory)
const { Router } = require("express");
const router = Router();
const signCtrl = require("./sign/sign.ctrl");
const kakaoCtrl = require("./sign/kakao");
const googleCtrl = require("./sign/google");
const adminCtrl = require("./admin/admin.ctrl");
const { getMyInfo } = require("./mypage");
const { updatePassword } = require("./mypage");
const { register } = require("./exhibition/register");
const { getExhibition } = require("./exhibition");
const { exhibitionLike } = require("./exhibition/likes");
const { withdrawalLike } = require("./exhibition/withdrawalLike");
const { deleteReview } = require("./review/deleteReview");
const { postReview } = require("./review/register");
const { getExhibitionReview } = require("./review");
const { getDetailReview } = require("./review/getDetailReview");
const { getMyLikes } = require("./mypage/likes");
const { getMyExhibition } = require("./mypage/exhibition");
const { modifyMyInfo } = require("./mypage/modify");
const { withdrawal } = require("./mypage/withdrawal");
const {
  getDetailExhibition,
} = require("../redisControllers/exhibition/getDetailExhibition");
// sign

// router.use("/sign-up", sign);
// router.use("/sign-in", sign);
// router.use("/sign-out", sign);
// router.use("/receive", sign);

// 일반 회원가입
router.post("/sign-up/user", signCtrl.generalSignUp);

// 작가 회원가입
router.post("/sign-up/author", signCtrl.authorSignUp);

// 로그인
router.post("/sign-in", signCtrl.signIn);

// 로그아웃
router.post("/sign-out", signCtrl.signOut);

// Goole
router.get("/receive/userinfo?", googleCtrl.getUserInfo);
router.post("/receive/token", googleCtrl.getToken);

// Kakao
router.post("/kakao-login/token", kakaoCtrl.getToken);
router.get("/kakao-login/userinfo?", kakaoCtrl.getUserInfo);

// mypage
router.get("/mypage", getMyInfo);

router.get("/mypage/like", getMyLikes);
router.get("/mypage/exhibition", getMyExhibition);
router.post("/mypage", modifyMyInfo);
router.delete("/mypage", withdrawal);

router.patch("/mypage/password", updatePassword);

// exhibition
router.get("/exhibition/detail/:postId", getDetailExhibition);
router.post("/exhibition/register", register);
router.get("/exhibition/:type", getExhibition);
router.get("/exhibition", getExhibition);
router.post("/exhibition/like", exhibitionLike);
router.delete("/exhibition/like/:postId/:type", withdrawalLike); //변경

//review
router.get("/review/:postId", getDetailReview);
router.post("/review", postReview);
router.delete("/review/:postId/:commentId", deleteReview); //변경
router.get("/review", getExhibitionReview);
// admin
// 전시 승인
router.post("/admin/exhibition", adminCtrl.approveExhibitions); //body 데이터 변경
// 전시 종료
router.delete("/admin/exhibition/:postId/:type", adminCtrl.closeExhibitions); //변경
// 리뷰 불러오기
router.get("/admin/review", adminCtrl.getAllReviews);
// 리뷰 삭제
router.delete("/admin/review/:postId/:commentId", adminCtrl.deleteReviews); //변경

module.exports = router;
