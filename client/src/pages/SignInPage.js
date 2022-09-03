import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { setSignInUserinfo } from '../redux/reducers/ModalReducer'
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";


const SignInPageWrap = styled.div`
  .signin_section {
      background-color: rgb(41, 41, 41);
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      overflow: hidden;
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
    width: 24px;
    height: 24px;
    position: relative;
    right: 20px;
  }

  .BC_logo {
    width: 120px;
    height: 120px;
    background-image: url("images/bucketscombine_logo.png");
    background-size: cover;
    margin-top: 50px;
  }

  .cancle-button {
    position: absolute;
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

  .cancle-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    background-image: url('/images/cancel-yellow-icon.png');
    background-size: cover;
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
    margin-bottom: 100px;
  }

  .login_kakao {
    display: flex;
    border: none;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 330px;
    height: 50px;
    border-radius: 5px;
    background-color: #fcde4d;
  }

  .login_naver {
    display: flex;
    border: none;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 330px;
    height: 50px;
    border-radius: 5px;
    background-color: #55c14b;
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
  const dispatch = useDispatch();


  const handleInputValue = (key) => (event) => {
    setErrormessage('')
    setLogininfo({ ...logininfo, [key]: event.target.value });
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
        const { jwtAccessToken } = res.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtAccessToken}`;
        const signInUserInfo = res.data.userInfo;
        localStorage.setItem('signInUserInfo', JSON.stringify(signInUserInfo));
        localStorage.setItem('isSignIn', JSON.stringify(true));
        history.push("/")
      })
      .catch((err)=> {
        setErrormessage('이메일 또는 비밀번호가 일치하지 않습니다.')
      })
    }
  }

  const cancle = () => {
    history.push("/")
  }

  const join = () => {
    history.push("/signup")
  }
  
  const isDesktop = useMediaQuery({ minWidth: 921 })

  

  const kakaoSignin = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI =  "https://www.bucketscombine.com/users/kakaologin";
    //const REDIRECT_URI =  "http://localhost:3000/users/kakaologin";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  }

  const isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
  if(isSignIn){
    history.push('/')
    window.location.reload();
  }
	return (
    <SignInPageWrap>
          <div className="signin_section">
            {isDesktop? 
            <button className="cancle-button" onClick={cancle}>취소</button>
            : <div className='cancle-icon' onClick={cancle}/>}
            <div className="signin_container">
              <div className="BC_logo"/>
              <div className="login_title">BucketsCombine</div>
              <div className='list' onSubmit={(e) => e.preventDefault()}>
                <input id="email"
                  type="email"
                  placeholder="이메일"
                  onChange={handleInputValue("email")}
                  maxLength='40'
                />
                <input id="password"
                  type="password"
                  placeholder="비밀번호"
                  onChange={handleInputValue("password")}
                  onKeyUp={(event) => handleInputKey(event)}
                  maxLength='12'
                />
                <div className='find'></div>
                <div className='alert'>{errormessage}</div>
                <div className="buttons">
                  <button className="login_box"
                    type="submit"
                    value="로그인"
                    onClick={signInRequestHandler}
                    >로그인
                  </button>
                  <button className="login_signup" onClick={join}>
                    회원가입
                  </button>
                  <button className="login_kakao" onClick={kakaoSignin}>
                    <img className="google-logo" src="images/kakao-logo.png"
                      alt="사진이 없습니다." width="20px" height="20px" />
                    카카오 로그인
                  </button>
                  <button className="login_naver">
                    <img className="google-logo" src="images/naver-logo.png"
                      alt="사진이 없습니다." width="20px" height="20px" />
                    네이버 로그인
                  </button>
                  <button className="login_google">
                    <img className="google-logo" src="images/Google-logo.png"
                      alt="사진이 없습니다." width="20px" height="20px" />
                    구글 로그인
                  </button>
                </div>
              </div>
            </div>
          </div>
    </SignInPageWrap>
	)
}