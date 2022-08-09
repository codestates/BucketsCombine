import { closeChangePasswordModal } from "../../redux/reducers/ModalReducer";
import { useDispatch } from "react-redux";
import ModalPortal from "./ModalPortal";
import useOutSideClick from "../hook/UseOutSideClick";
import React, { useRef, useState } from "react";
import styled from "styled-components";

const ChangePasswordModal = styled.div`
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
    .changePasswordCard{
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

    .logo_img{
        position: absolute;
        width: 10vw;
        height: 15vh;
        left: 10vw;
        top: 7vh;
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
        position: absolute;
        width: 20vw;
        height: 3vh;
        left: 5vw;
        top: 25vh;
    }

    .newPasswordComfirm {
        position: absolute;
        width: 20vw;
        height: 3vh;
        left: 5vw;
        top: 35vh;
    }

    .passwordchange-btn{
        position: absolute;
        background-color: rgb(255, 190, 0);
        border: none;
        border-radius: 5px 5px 5px 5px;
        width: 20vw;
        height: 7vh;
        left: 5vw;
        top: 45vh;
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
    };`


const ChangePasswordCardModal = () => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const handleClose = () => {
        dispatch(closeChangePasswordModal())
    };
    useOutSideClick(modalRef, handleClose);

    const [ message, setMessage ] = useState(false);
    const [ unmatchedMessage, setUnMatchedMessage ] = useState(false);
    const [ inputPassword, setInputPassword ] = useState('');
    const [ inputMatchedPassword, setInputMatchedPassword ] = useState('');
    const newPassword = () => {
        if(inputPassword.length < 6 ){
            setMessage(true);
        }else if(inputPassword.length >= 6 && inputMatchedPassword !== inputPassword){
            setMessage(false);
            setUnMatchedMessage(true);
        }else{
            dispatch(closeChangePasswordModal());
        }
    }
    // const matchedPassword = () => {
    //     if(inputMatchedPassword !== inputPassword){
    //         setUnMatchedMessage(true);
    //     }else{
    //         dispatch(closeChangePasswordModal());
    //     }
    // }
    return (
        
            <ChangePasswordModal>
                    <div className="changePasswordCard" ref={modalRef}>
                        <button className="close-btn" onClick={() => {
                            dispatch(closeChangePasswordModal())
                        }}>X</button>                 
                        <img className="logo_img" src="images/bucketscombine_logo.png" alt="card" />
                        <input className='newPassword' type='password' placeholder='새로운 비밀번호' onChange={(e) => {setInputPassword(e.target.value)}}></input>
                        {message?<div className="failure-message">비밀번호는 6자 이상이어야 합니다.</div>:<div></div>}
                        <input className="newPasswordComfirm" type='password' placeholder='새로운 비밀번호 재확인' onChange={(e) => {setInputMatchedPassword(e.target.value)}}></input>
                        {unmatchedMessage?<div className="unmatched-message">비밀번호가 일치 하지 않습니다.</div>:<div></div>} 
                        <button className="passwordchange-btn" onClick={newPassword}>비밀번호 변경</button>
                    </div>
            </ChangePasswordModal>
        
    );
}

export default ChangePasswordCardModal;