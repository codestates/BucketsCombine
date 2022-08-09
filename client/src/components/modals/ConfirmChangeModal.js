import { closeConfirmChangeModal, openChangePasswordModal, openWithdrawalModal } from "../../redux/reducers/ModalReducer";
import { useDispatch, useSelector } from "react-redux";
import ModalPortal from "./ModalPortal";
import useOutSideClick from "../hook/UseOutSideClick";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ConfirmChangeModal = styled.div`
    width: 30vw;
    height: 60vh;
    display: flex;
    border-radius: 20px 20px 20px 20px;
    border: solid rgb(170, 170, 170);
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 40vw;
    top: 20vh;
    z-index: 10;
    .confirmPasswordCard{
        position: relative;
        width: 30vw;
        height: 60vh;
        background-color: rgba(255, 255, 255);
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
        width: 10vw;
        height: 15vh;
        left: 10vw;
        top: 7vh;
    }

    .confirm-btn{
        position: absolute;
        background-color: rgb(255, 190, 0);
        border: none;
        border-radius: 5px 5px 5px 5px;
        width: 20vw;
        height: 7vh;
        left: 5vw;
        top: 45vh;
    }

    .usingPassword {
        position: absolute;
        width: 20vw;
        height: 3vh;
        left: 5vw;
        top: 30vh;
    }
    
    .check{
        position: absolute;
        color: red;
        left: 7vw;
        top: 35vh;
    }

`
axios.defaults.withCredentials = true;

const ConfirmChangeCardModal = () => {
    const signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
    const isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
    
    const dispatch = useDispatch();

    const modalRef = useRef(null);
    const handleClose = () => {
        dispatch(closeConfirmChangeModal())
    };
    useOutSideClick(modalRef, handleClose);

    const [ message, setMessage ] = useState(false);
    const [ inputPassword, setInputPassword ] = useState('');
    const [ isChange, setIsChange ] = useState();
    const [ isWithdrawal, setIsdrawal ] = useState(false);


    const checkPassword = () => {
        if(isSignIn){
        const payload = {
            // 'email': signInUserInfo.email,
            'password': inputPassword,
        }
            axios.get(`${process.env.REACT_APP_API_URL}/mypage/passwordcheck`, payload, {
                withCredentials: true,
            })
        }
    }
    

    return (
        <ModalPortal>
            <ConfirmChangeModal>
                
                <div className="confirmPasswordCard" ref={modalRef}>
                <button className="close-btn" onClick={() => {
                    dispatch(closeConfirmChangeModal())
                }}>X</button>         
                <img className="logo_img" src="images/bucketscombine_logo.png" alt="card" />
                <input className="usingPassword" type='password' placeholder='사용중인 비밀번호' onChange={(e) => {setInputPassword(e.target.value)}}></input>
                {message?<div className="check">비밀번호가 일치하지 않습니다</div>:<div></div>}
                <button className="confirm-btn" onClick={checkPassword}>확인</button>
                </div>
            </ConfirmChangeModal>
        </ModalPortal>
    );
}

export default ConfirmChangeCardModal;
