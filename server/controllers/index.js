const { Router } = require("express");
const router = Router();
const signCtrl = require("./sign/sign.ctrl");
const adminCtrl = require("./admin/admin.ctrl");
const mypageCtrl = require("./mypage/mypage.ctrl");
const exhibitCtrl = require("./exhibition/exhibit.ctrl");
const reviewCtrl = require("./review/review.ctrl");

// sign
router.post("/sign-up/user", signCtrl.generalSignUp);
router.post("/sign-up/author", signCtrl.authorSignUp);
router.post("/sign-in", signCtrl.signIn);
router.post("/sign-out", signCtrl.signOut);
router.get("/receive/userinfo?", signCtrl.google.getUserInfo);
router.post("/receive/token", signCtrl.google.getToken);
router.post("/kakao-login/token", signCtrl.kakao.getToken);
router.get("/kakao-login/userinfo?", signCtrl.kakao.getUserInfo);

// mypage
router.get("/mypage", mypageCtrl.getMyInfo);
router.get("/mypage/like", mypageCtrl.getMylikes);
router.get("/mypage/exhibition", mypageCtrl.getMyExhibition);
router.post("/mypage", mypageCtrl.modifyMyInfo);
router.delete("/mypage", mypageCtrl.withdrawal);
router.patch("/mypage/password", mypageCtrl.updatePassword);

// exhibition
router.get("/exhibition/detail/:postId", exhibitCtrl.getDetailExhibition);
router.post("/exhibition/register", exhibitCtrl.register);
router.get("/exhibition/:type", exhibitCtrl.getExhibition);
router.get("/exhibition", exhibitCtrl.getExhibition);
router.post("/exhibition/like", exhibitCtrl.exhibitionLike);
router.delete("/exhibition/like/:postId/:type", exhibitCtrl.withdrawalLike);
router.get("/exhibition/like/:postId", exhibitCtrl.getLikesCached);

//review
router.get("/review/:postId", reviewCtrl.getDetailReview);
router.post("/review", reviewCtrl.postReview);
router.delete("/review/:postId/:commentId", reviewCtrl.deleteReview);
router.get("/review", reviewCtrl.getExhibitionReviews);

// admin
router.post("/admin/exhibition", adminCtrl.approveExhibitions);
router.delete("/admin/exhibition/:postId/:type", adminCtrl.closeExhibitions);
router.get("/admin/review", adminCtrl.getAllReviews);
router.delete("/admin/review/:postId/:commentId", adminCtrl.deleteReviews);

module.exports = router;
