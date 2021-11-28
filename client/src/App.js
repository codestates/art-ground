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
import ThreeDGallery from "./pages/3dGallery/ThreeDGallery";
import Loading from "./components/loading/Loading";
import { getSignOutRes } from "./api/signApi";
import { getMyinfo } from "./api/mypageApi";
import ScrollTop from "./components/scrollTop/ScrollTop";
import GoLoginModal from "./components/modals/GoLoginModal";

function App() {
  const history = useHistory();
  const [isAuthorJoined, setIsAuthorJoined] = useState(false); // page
  const [isAudienceJoined, setIsAudienceJoined] = useState(false);
  const [isAuthorLogin, setIsAuthorLogin] = useState(false);
  const [isAudienceLogin, setIsAudienceLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // user
  const [userinfo, setUserinfo] = useState(null);
  const [isAdmin, setisAdmin] = useState(false);
  const [modifyRender, setModifyRender] = useState(false); //render
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

  return (
    <ScrollTop>
      {modalOpen ? 
      <GoLoginModal setModalOpen={setModalOpen} /> : null}
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/signin">
          <Navbar
            isLogin={isLogin}
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
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Google handleResponseSuccess={handleResponseSuccess} />
        </Route>
        <Route path="/signin/kakao">
          <Navbar
            isLogin={isLogin}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Kakao handleResponseSuccess={handleResponseSuccess} />
        </Route>
        <Route exact path="/join">
          <Navbar
            isLogin={isLogin}
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
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          {modifyRender ? (
            <MyPage
              userinfo={userinfo}
              setUserinfo={setUserinfo}
              setIsLogin={setIsLogin}
            />
          ) : (
            <Loading />
          )}
        </Route>
        <Route path="/about">
          <Navbar
            isLogin={isLogin}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <About />
          <ScrollButton />
        </Route>
        <Route path="/gallery">
          <Navbar
            isLogin={isLogin}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <Gallery 
          isLogin={isLogin} 
          userinfo={userinfo} 
          />
          <ScrollButton />
        </Route>
        <Route path="/gallerydetail/:id">
          <Navbar
            isLogin={isLogin}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <GalleryDetail 
          isLogin={isLogin}
          userinfo={userinfo}
          />
          <ScrollButton />
        </Route>
        <Route path="/reviewlist">
          <Navbar
            isLogin={isLogin}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <ReviewList />
          <ScrollButton />
        </Route>
        <Route path="/reviewdetail/:id">
          <Navbar
            isLogin={isLogin}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            setModalOpen={setModalOpen}
          />
          <ReviewDetail 
            userinfo={userinfo} 
            isLogin={isLogin} 
          />
          <ScrollButton />
        </Route>
        <Route path="/register">
          <Navbar
            isLogin={isLogin}
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
        <Route path="/3dgallery">
          <ThreeDGallery />
        </Route>
        <Route exact path="/modify">
          <Navbar
            isLogin={isLogin}
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
