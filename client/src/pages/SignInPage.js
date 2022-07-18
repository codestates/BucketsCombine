import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const SignInPageWrap = styled.div`
  .body {
    height: 100%;
    overflow: hidden;
  }
  #login_cancle {
    position: fixed;
    top: 15px;
    right: 15px;
    width: 100px;
    height: 30px;
    background-color: #ffc700;
    border: 0;
    border-radius: 5px;
  }
  .signin_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    background-color: rgb(41, 41, 41);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    overflow: hidden;
  }
  .signin_section {
    background-color: rgb(41, 41, 41);
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow: hidden;
  }
  .login_title {
    font-weight: bold;
    color: white;
    font-size: 30px;
    margin: 20px;
    border-radius: 5px;
  }
  .login_signupbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 40px;
    margin: 2px 100px;
    width: 400px;
    border-radius: 5px;
    height: 200px;
  }
  a {
    text-decoration-line: none;
  }
  #login_email {
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
    width: 246px;
    height: 40px;
    border: none;
  }
  #login_password {
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
    width: 246px;
    height: 40px;
    border: none;
  }
  #login_button {
    align-items: center;
    padding: 2px 30px;
    margin: 10px;
    width: 100px;
    height: 40px;
  }
  .login_box {
    background-color: #ff5c00;
    border: none;
    font-size: 16;
    margin: 5px;
    width: 330px;
    height: 40px;
    border-radius: 5px;
  }
  .login_google {
    flex: flex;
    border: none;
    font-size: 16;
    justify-content: center;
    margin: 7px;
    width: 330px;
    height: 40px;
    border-radius: 5px;
  }
  .login_signup {
    flex: flex;
    background-color: #ffc700;
    border: none;
    font-size: 16;
    width: 330px;
    height: 40px;
    justify-content: center;
    margin: 4px;
    border-radius: 5px;
  }
`;

export default function SignInPage({ handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
    // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
    if (loginInfo.email === "" || loginInfo.password === "") {
      setErrorMessage("이메일과 비밀번호를 입력하세요");
    } else {
      axios
        .post("http://localhost:4000/users/login", {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then((res) => {
          handleResponseSuccess();
        });
    }
  };

  return (
    <SignInPageWrap>
      <div className="body">
        <div>
          <div className="signin_section">
            <button id="login_cancle">취소</button>
            <div className="signin_container">
              <img
                src="images/bucketscombine_logo.png"
                alt="no"
                width="120px"
                height="120px"
              ></img>
              <p />
              <div className="login_title">BucketsCombine</div>
              <input
                id="login_email"
                type="email"
                placeholder="이메일"
                onChange={handleInputValue("login_email")}
              />
              <input
                id="login_password"
                type="password"
                placeholder="비밀번호"
                onChange={handleInputValue("login_password")}
              />
              <input
                id="login_button"
                type="submit"
                value="로그인"
                onSubmit={(e) => e.preventDefault}
              />
              <div className="alert-box">{errorMessage}</div>
              <li>
                <Link to="/signup">아이디 / 비밀번호찾기</Link>
              </li>
              <div className="login_signupbox">
                <button
                  className="login_box"
                  type="submit"
                  value="로그인"
                  onChange={handleLogin}
                >
                  로그인
                </button>
                <div className="alert-box">{errorMessage}</div>
                <button className="login_google">
                  <img
                    src="images/unnamed.webp"
                    alt="사진이 없습니다."
                    width="20px"
                    height="20px"
                  ></img>
                  구글 로그인 / 회원가입
                </button>
                <button className="login_signup">회원가입</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SignInPageWrap>
  );
}
