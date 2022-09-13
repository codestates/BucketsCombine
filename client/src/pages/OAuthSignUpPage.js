import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

axios.defaults.withCredentials = true;

const OAuthSignUpPageWrap = styled.div`
  .signin_section {
      background-color: rgb(41, 41, 41);
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      overflow: hidden;
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
    margin-top: 50px;
  }
  .signup_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
  }
  .input-area {
    width: 246px;
    height: 45px;
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
  .insertAdditionalInfo-button {
    border: none;
    background: #ffc700;
    border-radius: 5px;
    width: 330px;
    height: 50px;
    padding: 2px;
    margin: 30px 10px 100px 10px;
    border-radius: 5px;
    font-size: 16px;
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
  .warning-message {
    color: #FF5C00;
    font-size: 15px;
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

  .email {
    width: 246px;
    height: 45px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
    background-color: gray;
    color: white;
    line-height: 40px;
  }

  .signout-button {
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

  .signout-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    background-image: url('/images/yellow-sign-out-icon.png');
    background-size: cover;
  }
  .confirmNumber-button{
    border: none;
    background: gray;
    border-radius: 5px;
    width: 330px;
    height: 35px;
    padding: 2px;
    margin: 10px;
    border-radius: 5px;
  }

  .send-confirmNumber-button{
    border: none;
    background: #ffc700;
    border-radius: 5px;
    width: 330px;
    height: 35px;
    padding: 2px;
    margin: 10px;
    border-radius: 5px;
  }

  .sending-confirmNumber-button{
    border: none;
    background: #BA9205;
    border-radius: 5px;
    width: 330px;
    height: 35px;
    padding: 2px;
    margin: 10px;
    border-radius: 5px;
    color: white;
  }

  .email-locked {
    width: 246px;
    height: 45px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
    background-color: gray;
    color: white;
    line-height: 43px;
    font-size: 14px;
  }
`
export default function OAuthSignUpPage() {
  const isDesktop = useMediaQuery({ minWidth: 921 })
  const isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
  const signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
  const history = useHistory();

  const [emailWarning, setEmailWarning] = useState(false)
  const [usernameWarning, setUsernameWarning] = useState(false)
  const [ageWaring, setAgeWarning] = useState(false)
  const [genderWarning, setGenderWarning] = useState(false)

  const [emptyEmailWarning, setEmptyEmailWarning] = useState(false)
  const [emptyUsernameWarning, setEmptyUsernameWarning] = useState(false)

  const [aleadyEmailWarning, setAleadyEmailWarning] = useState(false)
  const [aleadyUsernameWarning, setAleadyUsernameWarning] = useState(false)

  const [inputEmail, setInputEmail] = useState('');
  const [inputUsername, setInputUsername ] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputGender, setInputGender] = useState('');

  const [isEmailExisted, setIsEmailExisted] = useState(false);


  const [isSendConfirmNumber, setIsSendConfirmNumber] = useState(false);
  const [isemailOK, setIsemailOK] = useState(false)
  const [inputConfirmNumber, setInputConfirmNumber] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [notConfirmedWarning, setNotConfirmedWarning] = useState(false)
  const [confirmNumber, setConfirmNumber] = useState(null)
  const [confirmNumberWarning, setConfirmNumberWarning] = useState(false)
  const [isSending, setIsSending] = useState(false)

  useEffect(()=>{
    if(signInUserInfo.email){
      setIsEmailExisted(true)
    }
  }, [])
  

  const emailFilter = (value) => {
    setAleadyEmailWarning(false)
    setEmptyEmailWarning(false)
    const regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(value === ''){
      setInputEmail(value)
      setEmailWarning(false)
    } else {
      if(regExp.test(value)){
        setInputEmail(value)
        setEmailWarning(false)
      } else {
        setInputEmail(value)
        setEmailWarning(true)
      }
    }
  }

  const usernameFilter = (value) => {
    setAleadyUsernameWarning(false)
    setEmptyUsernameWarning(false)
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

    if(regExp.test(value)){
      const inputValue = value.slice(0, value.length - 1)
      setInputUsername(inputValue)
      return
    } 

    if(value.length > 12){
      const inputValue = value.slice(0, 12)
      setInputUsername(inputValue)
      return
    }

    setInputUsername(value)
  }


  const insertAdditionalInfo = async () => {
    setAleadyEmailWarning(false)
    setAleadyUsernameWarning(false)
    setAgeWarning(false)
    setGenderWarning(false)
    setEmptyEmailWarning(false)
    setEmptyUsernameWarning(false)
    if(emailWarning === true || (inputEmail === "" && !isEmailExisted ) ||
      usernameWarning === true || inputUsername === "" ||
      inputAge === "" ||
      inputGender === ""
    ){
      if(inputEmail === "" && !isEmailExisted ){
        setEmptyEmailWarning(true)
      }
      if(inputUsername === ""){
        setEmptyUsernameWarning(true)
      }
      if (inputAge === "") {
        setAgeWarning(true)
      }
      if (inputGender === "") {
        setGenderWarning(true)
      }
    } else {
      if (isEmailExisted) {
        const eamilForSend = isEmailExisted ? '#no change' : inputEmail
        const payload = {
          'email': eamilForSend,
          'username': inputUsername,
          'userphotourl': '',
          'usertext': '',
          'gender': inputGender,
          'age': inputAge,
        }
        axios.patch(`${process.env.REACT_APP_API_URL}/mypage/edit`, payload)
          .then((res) => {
            if (res.data.email === false && res.data.username === false) {
              setAleadyEmailWarning(true)
              setAleadyUsernameWarning(true)
              return
            }
            if (res.data.email === false) {
              setAleadyEmailWarning(true)
              return
            }
            if (res.data.username === false) {
              setAleadyUsernameWarning(true)
              return
            }
            const changedUserinfo = {
              'id': signInUserInfo.id,
              'username': inputUsername,
              'userphotourl': '',
              'email': isEmailExisted ? signInUserInfo.email : inputEmail,
              'usertext': '',
              'gender': inputGender,
              'age': inputAge,
              'oauthlogin': signInUserInfo.oauthlogin,
              'createdAt': signInUserInfo.createdAt,
              'updatedAt': signInUserInfo.updatedAt,
            }
            localStorage.setItem('signInUserInfo', JSON.stringify(changedUserinfo));
            history.push("/")
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        if (isConfirmed === false) {
          setConfirmNumberWarning(false)
          setNotConfirmedWarning(true)
          return
        } else {
          const eamilForSend = isEmailExisted ? '#no change' : inputEmail
        const payload = {
          'email': eamilForSend,
          'username': inputUsername,
          'userphotourl': '',
          'usertext': '',
          'gender': inputGender,
          'age': inputAge,
        }
        axios.patch(`${process.env.REACT_APP_API_URL}/mypage/edit`, payload)
          .then((res) => {
            if (res.data.email === false && res.data.username === false) {
              setAleadyEmailWarning(true)
              setAleadyUsernameWarning(true)
              return
            }
            if (res.data.email === false) {
              setAleadyEmailWarning(true)
              return
            }
            if (res.data.username === false) {
              setAleadyUsernameWarning(true)
              return
            }
            const changedUserinfo = {
              'id': signInUserInfo.id,
              'username': inputUsername,
              'userphotourl': '',
              'email': isEmailExisted ? signInUserInfo.email : inputEmail,
              'usertext': '',
              'gender': inputGender,
              'age': inputAge,
              'oauthlogin': signInUserInfo.oauthlogin,
              'createdAt': signInUserInfo.createdAt,
              'updatedAt': signInUserInfo.updatedAt,
            }
            localStorage.setItem('signInUserInfo', JSON.stringify(changedUserinfo));
            history.push("/")
          })
          .catch(err => {
            console.log(err)
          })
        }
      }
      
    }
  }

  const handleSignout = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/logout`)
    .then(() => {
      localStorage.setItem('signInUserInfo', JSON.stringify(null));
      localStorage.setItem('isSignIn', JSON.stringify(false));
      window.location.replace("/");
    })
  };



  const sendConfirmNumber = () => {
    setIsSending(true)
    setNotConfirmedWarning(false)
    setAleadyEmailWarning(false)
    axios.post(`${process.env.REACT_APP_API_URL}/users/emailcheck`, {
      email: inputEmail,
    })
    .then((res) => {
      if(res.data.email){
        axios.post(`${process.env.REACT_APP_API_URL}/users/sendemail`, {
          email: inputEmail,
        })
        .then((res) => {
          setConfirmNumber(res.data.number)
          setIsSendConfirmNumber(true)
          setIsSending(false)
        })
        .catch((err) => {
          console.log(err)
          setIsSending(false)
        })
      } else {
        setIsSending(false)
        setAleadyEmailWarning(true)
      }
    })
  }

  const confirmNumberFilter = (value) => {
    setConfirmNumberWarning(false)
    if(value.length > 6){
      const fixedValue = value.slice(0, 6)
      setInputConfirmNumber(fixedValue)
    } else {
      setInputConfirmNumber(value)
    }
  }

  const checkConfirmNumber = () => {
    setNotConfirmedWarning(false)
    setConfirmNumberWarning(false)
    if(Number(inputConfirmNumber) === confirmNumber){
      setIsConfirmed(true)
    } else {
      setConfirmNumberWarning(true)
    }
  }

  useEffect(() => {
    setAleadyEmailWarning(false)
    if(emailWarning === false && inputEmail !== ""){
      setIsemailOK(true)
    } else {
      setIsemailOK(false)
    }
  }, [inputEmail])
  
  if (isSignIn) {
    if (signInUserInfo.email === null ||
      signInUserInfo.age === null ||
      signInUserInfo.gender === null ||
      signInUserInfo.username === null) {
      return (
        <OAuthSignUpPageWrap>
          <div className="signin_section">
            <div className="signin_container">
              <img
                className="BC_logo"
                src="images/bucketscombine_logo.png"
                alt="no"
                width="120px"
                height="120px"
              ></img>
              <div className="login_title">BucketsCombine</div>
              <div className='list' onSubmit={(e) => e.preventDefault()}>
                {isEmailExisted ?
                  <div className="email">{signInUserInfo.email}</div>
                  : <input
                    className="input-area"
                    type="email"
                    placeholder="이메일"
                    onChange={(e) => { emailFilter(e.target.value) }}
                    value={inputEmail}
                    maxLength='40'
                  />}
                <div className="warning-message">
                  {emailWarning ? "이메일 형식이 올바르지 않습니다." : ""}
                </div>
                <div className="warning-message">
                  {emptyEmailWarning ? "이메일을 입력해주세요." : ""}
                </div>
                <div className="warning-message">
                  {aleadyEmailWarning ? "이미 사용중인 이메일입니다." : ""}
                </div>
                {isSendConfirmNumber && !isConfirmed ?
                  <input
                    className="input-area"
                    type="number"
                    placeholder="이메일 인증번호"
                    onChange={(e) => { confirmNumberFilter(e.target.value) }}
                    value={inputConfirmNumber}
                    maxLength='40'
                  />
                  : null}
                <div className="warning-message">
                  {confirmNumberWarning ? "인증번호가 일치하지 않습니다." : ""}
                </div>
                {isSendConfirmNumber ? null
                  : isemailOK ? isSending ? <button className="sending-confirmNumber-button">인증번호 전송중</button>
                    : <button className="send-confirmNumber-button" onClick={sendConfirmNumber}>이메일 인증</button>
                    : <button className="confirmNumber-button">이메일 인증</button>
                }
                <div className="warning-message">
                  {notConfirmedWarning ? "이메일을 인증해주세요." : ""}
                </div>
                {isSendConfirmNumber && !isConfirmed ? <button className="send-confirmNumber-button" onClick={checkConfirmNumber}>확인</button> : null}
                <input
                  className="input-area"
                  type="username"
                  placeholder="별명"
                  onChange={(e) => { usernameFilter(e.target.value) }}
                  value={inputUsername}
                />
                <div className="warning-message">
                  {aleadyUsernameWarning ? "이미 사용중인 별명입니다." : ""}
                </div>
                <div className="warning-message">
                  {emptyUsernameWarning ? "별명을 입력해주세요." : ""}
                </div>
                <select className="btn_old" onChange={(e) => {
                  setAgeWarning(false)
                  setInputAge(e.target.value)
                }} method="get" required>
                  <option value="" >연령대</option>
                  <option value="10대">10대</option>
                  <option value="20대">20대</option>
                  <option value="30대">30대</option>
                  <option value="40대">40대</option>
                  <option value="50대">50대</option>
                  <option value="60대">60대</option>
                  <option value="70대">70대</option>
                  <option value="80대">80대</option>
                  <option value="90대">90대</option>
                  <option value="100세 이상">100세 이상</option>
                </select>
                <div className="warning-message">
                  {ageWaring ? "연령대를 선택해주세요." : ""}
                </div>
                <select className="btn_gender" onChange={(e) => {
                  setGenderWarning(false)
                  setInputGender(e.target.value)
                }} method="get" required>
                  <option value="" >성별</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                  <option value="선택안함">선택안함</option>
                </select>
                <div className="warning-message">
                  {genderWarning ? "성별을 선택해주세요." : ""}
                </div>
                <button
                  className="insertAdditionalInfo-button"
                  onClick={insertAdditionalInfo}
                >
                  추가 정보 입력
                </button>
                {isDesktop ? <button className='signout-button' onClick={handleSignout}>로그아웃</button>
                  : <div className='signout-icon' onClick={handleSignout} />
                }
              </div>
            </div>
          </div>
        </OAuthSignUpPageWrap>
      );
    } else {
      history.push('/')
      window.location.reload();
      return
    }
  } else {
    history.push('/signin')
    window.location.reload();
  }
}
