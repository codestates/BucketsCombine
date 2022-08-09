import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

axios.defaults.withCredentials = true;

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
  .BC_logo {
    width: 120px;
    height: 120px;
    background-image: url("images/bucketscombine_logo.png");
    background-size: cover;
  }
  .signup_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
  }
  .email {
    width: 250px;
    height: 50px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  .password {
    width: 250px;
    height: 50px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  .repassword {
    width: 250px;
    height: 50px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;

  }
  .username {
    width: 250px;
    height: 50px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  .btn_old {
    padding: 2px 40px;
    margin: 10px;
    width: 330px;
    height: 50px;
    border-radius: 5px;
    border: none;

  }
  .btn_gender {
    padding: 2px 40px;
    margin: 10px;
    width: 330px;
    height: 50px;
    border-radius: 5px;
    border: none;
  }
  .signup {
    border: none;
    background: #ffc700;
    border-radius: 5px;
    width: 330px;
    height: 50px;
    padding: 2px;
    margin: 10px;
    border-radius: 5px;
  }
  
  .alert-box{
    color: red;
  }
  a{
    text-decoration-line : none;
    color: white;
  }

  .errormessage{
    color: red;
  }

  #cancle {
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
  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .find {
    color: white;
    margin: 10px;
  }
  
`
export default function SignUpPage() {

  const [userinfo, setUserinfo] = useState({
    email: '',
    username: '',
    password: '',
    repassword: '',
    
  });
  const history = useHistory();
  const [errormessage, setErrormessage] = useState('')
  const [errormessage2, setErrormessage2] = useState('')
  const handleInputValue = (key) => (e) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
    validate()
  }
  const validate = () => {
    if (userinfo.email.length === ''){
      setErrormessage('이메일을 입력해 주십시오.')
    } else if (userinfo.username.length < 1 || userinfo.username.length > 6) {
      setErrormessage('닉네임은 1자리 이상 6자리 이하입니다')
    }
      else if (userinfo.password.length < 6 || userinfo.password.length > 12) {
      setErrormessage('비밀번호는 6자리 이상 12자리 이하입니다')
    } else if (userinfo.password !== userinfo.repassword) {
      setErrormessage('비밀번호가 일치하지 않습니다')
    } else {
      setErrormessage('')
    }
  }
  const handleSignup = async () => {
    if (userinfo.email==="" ||
       userinfo.username===""||
        userinfo.password==="" ||
         userinfo.repassword==="") {
                setErrormessage("모든 항목은 필수입니다");
    } else {
      await history.push("/signin")
      await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
        email: userinfo.email,
        password: userinfo.password,
        username: userinfo.username,
        repassword: userinfo.repassword
      })
    }
  }
  function validateEmail(email) {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }




  // const [userinfo, setuserinfo] = useState({
  //   email: "",
  //   password: "",
  //   username: "",
  // });
  // const [errorMessage, setErrorMessage] = useState("");
  // const history = useHistory();
  // const handleInputValue = (key) => (e) => {
  //   setuserinfo({ ...userinfo, [key]: e.target.value });
  // };
  // const handleSignup = () => {
  //   // TODO : 서버에 회원가입을 요청 후 로그인 페이지로 이동하세요.
  //   //        회원가입 성공 후 로그인 페이지 이동은 다음 코드를 이용하세요.
  //   //        history.push("/");
  //   // TODO : 모든 항목을 입력하지 않았을 경우 에러를 표시해야 합니다.
  //   if (
  //     !userinfo.email === "" ||
  //     !userinfo.password === "" ||
  //     !userinfo.username === ""
  //   ) {
  //     setErrorMessage("모든 항목은 필수입니다");
  //   } else {
  //      axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
  //       email: userinfo.email,
  //        password: userinfo.password,
  //        username: userinfo.username
  //      })
  //      .then((res) => {
  //       return history.push("/signin");
  //      });
  //   }
  //  };
  // useEffect(()=> {
  //   axios.post("http://localhost:4000/users/signup", {
  //       email: userinfo.email,
  //       password: userinfo.password,
  //       username: userinfo.username,
  //     })
  //     // .then((res) => {
  //     //   console.log(res)
  //     // });
  // }, [])

  const cancle = () => {
    history.goBack()
  }
  const btn_old = (target) => {
    const value = target.value;
    const text = target.options[target.selectedIndex].text;
    document.querySelector(`div`).innerHTML = `text: ${text} value: ${value}`;
  }
    const btn_gender = (target) => {
      const value = target.value;
      const text = target.options[target.selectedIndex].text;
      document.querySelector(`div`).innerHTML = `text: ${text} value: ${value}`;
  }

  return (
    <SignUpPageWrap>
      <div className="body">
        <div className="signin_section">
        <button id="cancle" onClick={cancle}>취소</button>
          <div className="signin_container">
            <img
              className="BC_logo"
              src="images/bucketscombine_logo.png"
              alt="no"
              width="120px"
              height="120px"
            ></img>
            <div className="login_title">BucketsCombine</div>
            <form>
            <div className='list' onSubmit={(e) => e.preventDefault()}>
            <input
              className="email"
              type="email"
              placeholder="이메일"
              onChange={handleInputValue("email")}
            />
            <input
              className="username"
              type="username"
              placeholder="닉네임"
              onChange={handleInputValue("username")}
            />
            <input
              className="password"
              type="password"
              placeholder="비밀번호"
              onChange={handleInputValue("password")}
              autoComplete="off"
            />
            <input
              className="repassword"
              type="password"
              placeholder="비밀번호 재확인"
              onChange={handleInputValue("repassword")}
              autoComplete="off"
            />
            <select className="btn_old" method="get" required>
              <option value="DEFAULT" >연령대</option>
              <option value="teenages">10대</option>
              <option value="twenty">20대</option>
              <option value="thirty">30대</option>
              <option value="forty">40대</option>
              <option value="fifty">50대</option>
              <option value="sixty">60대</option>
              <option value="seventy">70대</option>
            </select>
            <select className="btn_gender" method="get" required>
              <option value="DEFAULT" >성별</option>
              <option value="male">남자</option>
              <option value="female">여자</option>
              <option value="nochoice">선택안함</option>
		        </select>
            <button
              className="signup"
              type="submit"
              onClick={handleSignup}
            >
              가입하기
            </button>
            </div>
            </form>

            <div className="alert-box">{errormessage}</div>
        <div className="errormessage">{errormessage2}</div>
        <div className="find">이미 아이디가 있으신가요? <a href="/login">login</a></div>

          </div>
        </div>
      </div>
    </SignUpPageWrap>
  );
}
