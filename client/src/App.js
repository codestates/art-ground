import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Join from "./pages/join/Join";
import { useEffect, useState } from "react";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import SignInDetail from "./pages/signindetail/SignInDetail";
import MyPage from "./pages/mypage/MyPage";
import Modify from "./pages/modify/Modify";
import Google from "./pages/google/Google";
import Kakao from "./pages/kakao/Kakao";
import Gallery from "./pages/gallery/Gallery";
import GalleryDetail from "./pages/galleryDetail/GalleryDetail";
import ReviewList from "./pages/reviewList/ReviewList";
import ReviewDetail from "./pages/reviewDetail/ReviewDetail";
import Landing from "./pages/landing/Landing";
import Contact from "./pages/contact/Contact";
import Admin from "./pages/admin/Admin";
import Register from "./pages/register/Register";
import ScrollButton from "./components/scrollButton/ScrollButton";
import About from "./pages/about/About";
import ScrollTab from "./components/scrollTab/ScrollTab";
import ThreeDGallery from "./pages/3dGallery/ThreeDGallery";
import Loading from "./components/loading/Loading";
import { getSignOutRes } from "./api/signApi";
import { getMyinfo } from "./api/mypageApi";
import ScrollTop from "./components/scrollTop/ScrollTop";
import GoLoginModal from "./components/modals/GoLoginModal";

function App() {
  const history = useHistory();
  // 가입,로그인(page)
  const [isAuthorJoined, setIsAuthorJoined] = useState(false);
  const [isAudienceJoined, setIsAudienceJoined] = useState(false);
  const [isAuthorLogin, setIsAuthorLogin] = useState(false);
  const [isAudienceLogin, setIsAudienceLogin] = useState(false);
  // 로그인,유저인포(상태)
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [isAdmin, setisAdmin] = useState(false);

  const [modifyRender, setModifyRender] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setTimeout(() => {
      setModifyRender(true);
    }, 500);
  }, []);

  const isAuthenticated = () => {
    getMyinfo(setUserinfo, setisAdmin);
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
    setIsLogin(true);
    window.localStorage.setItem("isLogin", true);
    history.push("/about");
  };

  useEffect(() => {
    isAuthenticated();
  }, [isLogin]);

  const handleLogout = () => {
    getSignOutRes(setUserinfo, setIsLogin, setisAdmin, isLogin);
    history.push("/about");
  };

  const [gallerySelected, setGallerySelected] = useState(null);
  const [reviewSelected, setReviewSelected] = useState(null);
  const [threeDSelected, setThreeDSelected] = useState(null);

  return (
    <ScrollTop>
      {modalOpen ? <GoLoginModal setModalOpen={setModalOpen} /> : null}
      <Switch>
        <Route exact path="/">
          <Landing isLogin={isLogin} userinfo={userinfo} />
        </Route>
        <Route exact path="/signin">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <SignIn
            setIsAuthorLogin={setIsAuthorLogin}
            setIsAudienceLogin={setIsAudienceLogin}
          />
        </Route>
        <Route path="/signin/detail">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <SignInDetail
            isAuthorLogin={isAuthorLogin}
            isAudienceLogin={isAudienceLogin}
            handleResponseSuccess={handleResponseSuccess}
            setisAdmin={setisAdmin}
          />
        </Route>

        <Route path="/signin/google">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Google />
        </Route>
        <Route path="/signin/kakao">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Kakao />
        </Route>
        <Route exact path="/join">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Join
            setIsAuthorJoined={setIsAuthorJoined}
            setIsAudienceJoined={setIsAudienceJoined}
          />
        </Route>
        <Route path="/join/signup">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <SignUp
            isAuthorJoined={isAuthorJoined}
            isAudienceJoined={isAudienceJoined}
          />
        </Route>
        <Route exact path="/mypage">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setUserinfo={setUserinfo}
            setModalOpen={setModalOpen}
          />
          {modifyRender ? (
            <MyPage
              userinfo={userinfo}
              setUserinfo={setUserinfo}
              setIsLogin={setIsLogin}
              gallerySelected={gallerySelected}
              selectGallery={(el) => setGallerySelected(el)}
            />
          ) : (
            <Loading />
          )}
          {/* {isLogin ? <MyPage userinfo={userinfo} /> : <SideBar />} */}
        </Route>
        <Route path="/about">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <About />
          <ScrollTab />
        </Route>
        <Route path="/gallery">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Gallery
            isLogin={isLogin}
            userinfo={userinfo}
            selectGallery={(el) => setGallerySelected(el)}
          />
          <ScrollButton />
        </Route>
        <Route path="/gallerydetail/:id">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <GalleryDetail
            gallerySelected={gallerySelected}
            handle3dExhibition={(el) => setThreeDSelected(el)}
          />
          <ScrollButton />
        </Route>
        <Route path="/reviewlist">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <ReviewList
            isLogin={isLogin}
            selectReview={(el) => setReviewSelected(el)}
          />
          <ScrollButton />
        </Route>
        <Route path="/reviewdetail/:id">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <ReviewDetail
            userinfo={userinfo}
            isLogin={isLogin}
            reviewSelected={reviewSelected}
          />
          <ScrollButton />
        </Route>
        <Route path="/register">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Register 
          userinfo={userinfo} 
          isLogin={isLogin} 
          />
          <ScrollButton />
        </Route>
        <Route path="/3dgallery/:id">
          <ThreeDGallery 
          threeDSelected={threeDSelected} 
          />
        </Route>
        <Route exact path="/modify">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          {modifyRender ? (
            <Modify userinfo={userinfo} setUserinfo={setUserinfo} />
          ) : (
            <Loading />
          )}
        </Route>

        <Route exact path="/contact">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Contact />
        </Route>
        <Route exact path="/admin">
          <Admin isAdmin={isAdmin} setisAdmin={setisAdmin} />
        </Route>
      </Switch>
    </ScrollTop>
  );
}

export default App;
