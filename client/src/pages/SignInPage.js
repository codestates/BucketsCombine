import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { setSignInUserId, setIsSignIn, setCookie } from '../redux/reducers/ModalReducer'
import { useSelector, useDispatch } from "react-redux";


const SignInPageWrap = styled.div`
  .body {
    height: 100%;
    overflow: hidden;
  }
  #login_cancle {
    position: fixed;
    top: 20px;
    right: 0;
    margin-right: 30px;
    border: none;
    box-shadow: none;
    width: 120px;
    height: 36px;
    border-radius: 12px;
    font-size: 15px;
    background-color: #FFC700;
  }
  .signin_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  .login_signupbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 40px;
    margin: 2px 100px;
    width: 400px;
    border-radius: 5px;
    height: 200px; 
  }
  a{
    text-decoration-line : none;
  }
  #email {
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
    width: 246px;
    height: 40px;
    border: none;
  }
  #password {
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
    font-size: 16px;
    color: white;
    margin: 10px;
    width: 330px;
    height: 50px;
    border-radius: 5px;
  }
  .login_google {
    display: flex;
    border: none;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 330px;
    height: 50px;
    border-radius: 5px;
  }
  .login_signup {
    flex: flex;
    background-color: #ffc700;
    border: none;
    font-size: 16px;
    width: 330px;
    height: 50px;
    justify-content: center;
    margin: 10px;
    border-radius: 5px;
  }

  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .find {
    color: white;
    margin: 10px;
  }
  .alert{
    color: #FF5C00;
    font-size: 14px;
    margin: 10px;
  }
  .google-logo {
    width: 40px;
    height: 40px;
    position: relative;
    right: 20px;
  }

  .BC_logo {
    width: 120px;
    height: 120px;
    background-image: url("images/bucketscombine_logo.png");
    background-size: cover;
  }
`

export default function SignInPage({ handleResponseSuccess, setIsLogin }) {
  const [logininfo, setLogininfo] = useState({
    email: "",
    password: ""
  });
  const [errormessage, setErrormessage] = useState('');
  const [cookies, setCookie] = useCookies(['id']);
  const history = useHistory();


  const handleInputValue = (key) => (event) => {
    setLogininfo({ ...logininfo, [key]: event.target.value });
    
    // if(key === "password" && )
  };

  const handleInputKey = (event) => {
    if(event.key === "Enter" ){
      signInRequestHandler()
    }
  };
  
  const signInRequestHandler = () => {
    if (!logininfo.email || !logininfo.password){
      setErrormessage('이메일과 비밀번호를 입력해야 합니다')
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email: logininfo.email,
        password: logininfo.password,
      },{
        withCredential: true,
      })
      .then((res) => {
        const signInUserInfo = res.data.userInfo;
        localStorage.setItem('signInUserInfo', JSON.stringify(signInUserInfo));
        localStorage.setItem('isSignIn', JSON.stringify(true));
        history.push("/")
      })
      .catch((err)=> {
        alert(err)
      })
    }
  }

  const cancle = () => {
    history.goBack()
  }

  const join = () => {
    history.push("/signup")
  }
  

	return (
    <SignInPageWrap>
      <div className="body">
        <div>
          <div className="signin_section">
            <button id="login_cancle" onClick={cancle}>취소</button>
            <div className="signin_container">
              <div className="BC_logo"/>
              <div className="login_title">BucketsCombine</div>
              <div className='list' onSubmit={(e) => e.preventDefault()}>
                <input id="email"
                  type="email"
                  placeholder="이메일"
                  onChange={handleInputValue("email")}
                />
                <input id="password"
                  type="password"
                  placeholder="비밀번호"
                  onChange={handleInputValue("password")}
                  onKeyUp={(event) => handleInputKey(event)}
                />
                <div className='find'>아이디 / 비밀번호찾기</div>
                <div className='alert'>{errormessage}</div>
                <div className="buttons">
                  <button className="login_box"
                    type="submit"
                    value="로그인"
                    onClick={signInRequestHandler}
                    >로그인
                  </button>
                  <button className="login_google">
                    <img className="google-logo" src="images/unnamed.webp"
                      alt="사진이 없습니다." width="20px" height="20px" />
                    구글 로그인 / 회원가입
                  </button>
                  <button className="login_signup" onClick={join}>
                    회원가입
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SignInPageWrap>
	)
}