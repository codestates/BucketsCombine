import { closeConfirmWithdrawal, closeWithdrawalModal, openWithdrawalModal } from "../../redux/reducers/ModalReducer";
import { useDispatch, useSelector } from "react-redux";
import ModalPortal from "./ModalPortal";
import useOutSideClick from "../hook/UseOutSideClick";
import React, { useRef, useState } from "react";
import styled from "styled-components";

const ConfirmWithdrawalModal = styled.div`
    .confirmPasswordCard{
    position: fixed;
    left: calc(50vw - 100px) ;
    top: calc(50vh - 250px);
    width: 320px;
    height: 500px;
    z-index: 10;
    display: flex;
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
    }

    .usingPassword {
        position: absolute;
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

`

const ConfirmWithdrawalCardModal = () => {
    let signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
    let isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
    console.log(signInUserInfo.password);
    const { isOpenWithdrawal } = useSelector((store) => store.modal);
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const handleClose = () => {
        dispatch(closeConfirmWithdrawal())
    };
    useOutSideClick(modalRef, handleClose);
    const [ message, setMessage ] = useState(false);
    const [ inputPassword, setInputPassword ] = useState('');
    const [ isWithdrawal, setIsdrawal ] = useState(false);
    
    const confirmWithdrawal = () => {
        if(inputPassword !== signInUserInfo.password){
            setMessage(true);
        }else{
            setMessage(false);
            dispatch(openWithdrawalModal())
        }
    }

    return (
        <ModalPortal>
            <ConfirmWithdrawalModal>
                <div className="confirmPasswordCard" ref={modalRef}>
                <button className="close-btn" onClick={() => {
                    dispatch(closeConfirmWithdrawal())
                }}>X</button>         
                <img className="logo_img" src="images/bucketscombine_logo.png" alt="card" />
                <input className="usingPassword" type='password' placeholder='사용중인 비밀번호' onChange={(e) => {setInputPassword(e.target.value)}}></input>
                {message?<div className="check">비밀번호가 일치하지 않습니다</div>:<div></div>}
                <button className="confirm-btn" onClick={confirmWithdrawal}>확인</button>
                </div>
            </ConfirmWithdrawalModal>
        </ModalPortal>
    );
}

export default ConfirmWithdrawalCardModal;
