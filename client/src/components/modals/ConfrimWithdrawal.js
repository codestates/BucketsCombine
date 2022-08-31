import { closeConfirmWithdrawal, closeWithdrawalModal, openWithdrawalModal } from "../../redux/reducers/ModalReducer";
import { useDispatch, useSelector } from "react-redux";
import ModalPortal from "./ModalPortal";
import useOutSideClick from "../hook/UseOutSideClick";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const ConfirmWithdrawalModal = styled.div`
    .confirmPasswordCard{
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

  .confirmPasswordCard-mobile{
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

    .logo_img{
        position: absolute;
        width: 100px;
        height: 100px;
        top: 50px;
    }

    .confirm-btn{
        position: absolute;
        background-color: rgb(255, 190, 0);
        border: none;
        border-radius: 10px;
        width: 120px;
        height: 50px;
        bottom: 50px;
        :hover{
          box-shadow:  3px 3px 6px rgba(0,0,0,0.2);
          transition: box-shadow 0.2s;
        }

        :active{
          box-shadow:  inset 3px 3px 6px rgba(150,0,0,0.2);
        }
    }

    .passwordArea {
        width: 240px;
        height: 30px;
        border-radius: 5px;
        border: solid rgb(170, 170, 170);
    }
    
    .check{
        position: absolute;
        color: red;
        left: 7vw;
        top: 35vh;
    }

    .warning-message {
    color: #FF5C00;
    font-size: 15px;
  }

`

const ConfirmWithdrawalCardModal = () => {
    const isDesktop = useMediaQuery({ minWidth: 921 })

    let signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
    let isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
    const { isOpenWithdrawal } = useSelector((store) => store.modal);
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const handleClose = () => {
        dispatch(closeConfirmWithdrawal())
    };
    useOutSideClick(modalRef, handleClose);
    const [emptyPasswordWarning, setEmptyPasswordWarning] = useState(false)
    const [passwordWarning, setPasswordWarning] = useState(false);
    const [inputPassword, setInputPassword] = useState('');


    const passwordFilter = (value) => {
        setEmptyPasswordWarning(false)
        if (value === "") {
          setPasswordWarning(false)
          setInputPassword(value)
        } else {
            setInputPassword(value)
          if (value.length > 12) {
            const fixedValue = value.slice(0, 12)
            setInputPassword(fixedValue)
          }
        }
      }
    
    const confirmWithdrawal = () => {
        if(inputPassword === ""){
            setEmptyPasswordWarning(true)
            return
        }
        if (isSignIn) {
            const payload = {
              'password': inputPassword,
            }
            axios.get(`${process.env.REACT_APP_API_URL}/mypage/passwordcheck`, payload, {
              withCredentials: true,
            })
            .then(() => {
                dispatch(openWithdrawalModal())
                dispatch(closeConfirmWithdrawal())
            })
            .catch(() => {
              setPasswordWarning(true)
            })
          }
        
    }

    return (
        <ModalPortal>
            <ConfirmWithdrawalModal>
                <div className={isDesktop? "confirmPasswordCard" : "confirmPasswordCard-mobile"} ref={modalRef}>
                <button className="close-btn" onClick={() => {
                    dispatch(closeConfirmWithdrawal())
                }}>X</button>         
                <img className="logo_img" src="images/bucketscombine_logo.png" alt="card" />
                <input className="passwordArea" type='password' placeholder='현재 비밀번호' value={inputPassword} onChange={(e) => { passwordFilter(e.target.value) }}/>
                 <div className="warning-message">{passwordWarning ? "비밀번호가 일치하지 않습니다." : ""}</div>
                <div className="warning-message">{emptyPasswordWarning ? "비밀번호를 입력해주세요" : ""}</div>
                <button className="confirm-btn" onClick={confirmWithdrawal}>확인</button>
                </div>
            </ConfirmWithdrawalModal>
        </ModalPortal>
    );
}

export default ConfirmWithdrawalCardModal;
