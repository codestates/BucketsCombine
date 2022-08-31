import { closeChangePasswordModal } from "../../redux/reducers/ModalReducer";
import { useDispatch } from "react-redux";
import ModalPortal from "./ModalPortal";
import useOutSideClick from "../hook/UseOutSideClick";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const ChangePasswordModal = styled.div`
    .changePasswordCard{
        position: fixed;
        left: calc(50vw - 100px) ;
        top: calc(50vh - 250px);
        width: 320px;
        height: 500px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: solid rgb(170, 170, 170);
        border-radius: 20px 20px 20px 20px;
        animation: fadein 0.5s;
        -moz-animation: fadein 0.5s;
        -webkit-animation: fadein 0.5s;
        -o-animation: fadein 0.5s;
        
        @keyframes fadein {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @-moz-keyframes fadein { 
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @-webkit-keyframes fadein { 
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @-o-keyframes fadein {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    }

    .changePasswordCard-mobile{
    position: fixed;
    left: calc(50vw - 160px) ;
    top: calc(50vh - 250px);
    width: 320px;
    height: 500px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: solid rgb(170, 170, 170);
    border-radius: 20px 20px 20px 20px;
    animation: fadein 0.5s;
    -moz-animation: fadein 0.5s;
    -webkit-animation: fadein 0.5s;
    -o-animation: fadein 0.5s;
      
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @-moz-keyframes fadein { 
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @-webkit-keyframes fadein { 
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @-o-keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
  }

    .logo_img{
        position: absolute;
        width: 100px;
        height: 100px;
        top: 50px;
    }

    .close-btn {
        margin: 1px;
        position: absolute;
        display: flex;
        border: none;
        width: 20px;
        height: 20px;
        top: 1vh;
        right: 1vw;
        background: none;
        z-index: 15;
    }

    .newPassword {
        margin: 20px 0px 0px 0px;
        width: 240px;
        height: 30px;
        border-radius: 5px;
        border: solid rgb(170, 170, 170);
    }

    .newPasswordComfirm {
        margin: 20px 0px 0px 0px;
        width: 240px;
        height: 30px;
        border-radius: 5px;
        border: solid rgb(170, 170, 170);
    }

    .passwordchange-btn{
        position: absolute;
        background-color: rgb(255, 190, 0);
        border: none;
        border-radius: 10px;
        width: 120px;
        height: 50px;
        bottom: 50px;
        transition: box-shadow 0.2s;

        :hover{
          box-shadow:  3px 3px 6px rgba(0,0,0,0.2);
          transition: box-shadow 0.2s;
        }

        :active{
          box-shadow:  inset 3px 3px 6px rgba(150,0,0,0.2);
        }
    }

    .failure-message{
        position: absolute;
        color: red;
        left: 6vw;
        top:30vh;
    }
    
    .unmatched-message{
        position: absolute;
        color: red;
        left: 7vw;
        top: 40vh;
    };
    .warning-message {
    color: #FF5C00;
    font-size: 15px;
  }
`


const ChangePasswordCardModal = () => {
  const isDesktop = useMediaQuery({ minWidth: 921 })

  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const handleClose = () => {
    if (window.confirm("비밀번호가 변경되지 않았습니다. 닫으시겠습니까?") === true) {
      dispatch(closeChangePasswordModal())
    } else {
      return
    }

  };
  useOutSideClick(modalRef, handleClose);

  const [passwordWarning, setPasswordWarning] = useState(false)
  const [rePasswordWarning, setRePasswordWarning] = useState(false)
  const [emptyPasswordWarning, setEmptyPasswordWarning] = useState(false)

  const [inputPassword, setInputPassword] = useState('');
  const [inputRepassword, setInputRepassword] = useState('');

  const passwordFilter = (value) => {
    setEmptyPasswordWarning(false)
    if (value === "") {
      setPasswordWarning(false)
      setInputPassword(value)
    } else {
      if (value.length < 6) {
        setPasswordWarning(true)
        setInputPassword(value)
      } else {
        setPasswordWarning(false)
        setInputPassword(value)
      }
      if (value.length > 12) {
        const fixedValue = value.slice(0, 12)
        setInputPassword(fixedValue)
      }
    }
  }

  const repasswordFilter = (value) => {
    if (value.length > 12) {
      const fixedValue = value.slice(0, 12)
      setInputRepassword(fixedValue)
    } else {
      setInputRepassword(value)
    }
  }

  useEffect(() => {
    if (inputRepassword === "") {
      setRePasswordWarning(false)
    } else {
      if (inputPassword === inputRepassword) {
        setRePasswordWarning(false)
      } else {
        setRePasswordWarning(true)
      }
    }
  }, [inputRepassword])

  const changePassword = () => {
    if(inputPassword === "" ){
      setEmptyPasswordWarning(true)
      return
    }
    if(inputRepassword === "" ){
      setRePasswordWarning(true)
      return
    }
    if(passwordWarning === true ||
      rePasswordWarning === true){
        return
      }
    
    const payload = {
      'password': inputPassword,
    }
    axios.get(`${process.env.REACT_APP_API_URL}/mypage/passwordchange`, payload, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(closeChangePasswordModal());
    })
    .catch((err) => {
      alert(err)
    })
  }
  return (
    <ChangePasswordModal>
      <div className={isDesktop ? "changePasswordCard" : "changePasswordCard-mobile"} ref={modalRef}>
        <button className="close-btn" onClick={() => {
          dispatch(closeChangePasswordModal())
        }}>X</button>
        <img className="logo_img" src="images/bucketscombine_logo.png" alt="card" />
        <input className='newPassword' type='password' placeholder='새로운 비밀번호' value={inputPassword} onChange={(e) => { passwordFilter(e.target.value) }}></input>
        <div className="warning-message">
          {passwordWarning ? "비밀번호는 6자 이상 12자 이하여야 합니다." : ""}
        </div>
        <div className="warning-message">
          {emptyPasswordWarning ? "비밀번호를 입력해주세요" : ""}
        </div>
        <input className="newPasswordComfirm" type='password' placeholder='새로운 비밀번호 확인' value={inputRepassword} onChange={(e) => { repasswordFilter(e.target.value) }}></input>
        <div className="warning-message">{rePasswordWarning ? "비밀번호가 일치하지 않습니다." : ""}</div>
        <button className="passwordchange-btn" onClick={changePassword}>비밀번호 변경</button>
      </div>
    </ChangePasswordModal>

  );
}

export default ChangePasswordCardModal;