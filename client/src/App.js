import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Join from "./pages/join/Join";
import { useState } from "react";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import SignInDetail from "./pages/signindetail/SignInDetail";
import MyPage from "./pages/mypage/MyPage";
import Modify from "./pages/modify/Modify";
import Google from "./pages/google/Google";
import Kakao from "./pages/kakao/Kakao";

function App() {
  //가입
  const [isAuthorJoined, setIsAuthorJoined] = useState(false);
  const [isAudienceJoined, setIsAudienceJoined] = useState(false);
  //로그인
  const [isAuthorLogin, setIsAuthorLogin] = useState(false);
  const [isAudienceLogin, setIsAudienceLogin] = useState(false);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/signin">
          <SignIn
            setIsAuthorLogin={setIsAuthorLogin}
            setIsAudienceLogin={setIsAudienceLogin}
          />
        </Route>
        <Route path="/signin/detail">
          <SignInDetail
            isAuthorLogin={isAuthorLogin}
            isAudienceLogin={isAudienceLogin}
          />
        </Route>
        <Route path="/signin/google">
          <Google />
        </Route>
        <Route path="/signin/kakao">
          <Kakao />
        </Route>
        <Route exact path="/join">
          <Join
            setIsAuthorJoined={setIsAuthorJoined}
            setIsAudienceJoined={setIsAudienceJoined}
          />
        </Route>
        <Route path="/join/signup">
          <SignUp
            isAuthorJoined={isAuthorJoined}
            isAudienceJoined={isAudienceJoined}
          />
        </Route>
        <Route exact path="/mypage">
          <MyPage />
        </Route>
        <Route exact path="/modify">
          <Modify />
        </Route>
        <Route path="/gallery">{/* <Gallery />  */}</Route>
      </Switch>
    </Router>
  );
}

export default App;
