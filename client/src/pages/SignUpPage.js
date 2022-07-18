import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const SignUpPageWrap = styled.div`
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
    background: #ffc700;
    border-radius: 15px;
    border: 0;
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
    padding: 5px 40px;
    margin: 2px 100px;
    width: 250px;
    border-radius: 5px;
  }
  .login_box {
    background-color: orange;
    border: none;
    font-size: 16;
    margin: 7px;
    height: 30px;
    border-radius: 5px;
  }
  .login_google {
    flex: flex;
    border: none;
    font-size: 16;
    justify-content: center;
    margin: 7px;
    height: 30px;
    border-radius: 5px;
  }
  .login_signup {
    flex: flex;
    background-color: yellow;
    border: none;
    font-size: 16;
    height: 30px;
    justify-content: center;
    margin: 4px;
    border-radius: 5px;
  }
  #login_email {
    width: 246px;
    height: 32px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  #login_password {
    width: 246px;
    height: 32px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  .signup_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
  }
  #signup_repassword {
    width: 246px;
    height: 32px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  #login_nickname {
    width: 246px;
    height: 32px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  .btn_old {
    padding: 5px 40px;
    margin: 10px;
    width: 330px;
    height: 40px;
    border-radius: 5px;
  }
  .btn_gender {
    padding: 5px 40px;
    margin: 10px;
    width: 330px;
    height: 40px;
    border-radius: 5px;
  }

  .signup_signup {
    border: none;
    font-size: 16;
    height: 40px;
    justify-content: center;
    margin: 4px;
    width: 330px;
    background: #ffc700;
    border-radius: 5px;
  }
`;
export default function SignUpPage() {
  const [userinfo, setuserinfo] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };
  const handleSignup = () => {
    // TODO : 서버에 회원가입을 요청 후 로그인 페이지로 이동하세요.
    //        회원가입 성공 후 로그인 페이지 이동은 다음 코드를 이용하세요.
    //
    //        history.push("/");
    //
    // TODO : 모든 항목을 입력하지 않았을 경우 에러를 표시해야 합니다.
    if (
      userinfo.email === "" ||
      userinfo.password === "" ||
      userinfo.username === ""
    ) {
      console.log("test-----");
      setErrorMessage("모든 항목은 필수입니다");
    } else {
      axios
        .post("http://localhost:4000/users/signup", {
          email: userinfo.email,
          password: userinfo.password,
          username: userinfo.username,
        })
        .then((res) => {
          history.push("/");
        });
    }
  };
  return (
    <SignUpPageWrap>
      <div className="body">
        <div className="signin_section">
          <button id="login_cancle">취소</button>
          <div className="signin_container">
            <img
              src="images/bucketscombine_logo.png"
              alt="no"
              width="120px"
              height="120px"
            ></img>
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
              id="signup_repassword"
              type="password"
              placeholder="비밀번호 재확인"
              onChange={handleInputValue("login_password")}
            />
            <input id="login_nickname" type="text" placeholder="닉네임" />
            <select className="btn_old" required>
              <option value="">연령대</option>
              <option value="teenages">10대</option>
              <option value="twenty">20대</option>
              <option value="thirty">30대</option>
              <option value="forty">40대</option>
              <option value="fifty">50대</option>
              <option value="sixty">60대</option>
              <option value="seventy">70대</option>
            </select>
            <select className="btn_gender" required>
              <option value="">성별</option>
              <option value="teenages">남자</option>
              <option value="twenty">여자</option>
              <option value="thirty">선택안함</option>
            </select>
            <button
              className="signup_signup"
              type="submit"
              onClick={handleSignup}
            >
              가입하기
            </button>
            <div className="alert-box">{errorMessage}</div>
          </div>
        </div>
      </div>
    </SignUpPageWrap>
  );
}
