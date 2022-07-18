import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  Router,
  BrowserRouter,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OAuthSignUpPage from "./pages/OAuthSignUpPage";
import RowList from "./components/RowList";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import MainPageCardModal from "./components/modals/MainPageCardModal";
import axios from "axios";
import "./App.css";

export default function Application() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const history = useHistory();
  const isAuthenticated = () => {
    // TODO: 이제 인증은 성공했습니다. 사용자 정보를 호출하고, 이에 성공하면 로그인 상태를 바꿉시다.
    axios
      .get("http://localhost:4000/users/signup")
      .then((res) => {
        setUserinfo({
          email: res.data.userInfo,
          username: res.data.username,
        });
      })
      .then((res) => {
        setIsLogin(true);
      });
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const App = () => {
    const { isOpen } = useSelector((store) => store.modal);
  };
  const handleLogout = () => {
    axios.post("http://localhost:4000/users/logout").then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      history.push("/");
    });
  };
  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {<MainPageCardModal />}
            <MainPage />
          </Route>
          <Route exact path="/signin">
            <SignInPage
              isLogin={isLogin}
              handleResponseSuccess={handleResponseSuccess}
            />
          </Route>
          <Route exact path="/signupoauth">
            <OAuthSignUpPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage isLogin={isLogin} />
          </Route>
          <Route exact path="/mypage">
            <MyPage userinfo={userinfo} handleLogout={handleLogout} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
