import { closeWithdrawalModal } from "../../redux/reducers/ModalReducer";
import { useDispatch } from "react-redux";
import ModalPortal from "./ModalPortal";
import React, { useRef } from "react";
import useOutSideClick from "../hook/UseOutSideClick.js";
import styled from "styled-components";

const WithdrawalModal = styled.div`
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
    .withdrawalCard{
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

    .withdrawal-message{
        position: absolute;
        width: 20vw;
        left: 6vw;
        top: 25vh;
    }

    .cancel-btn{
        position: absolute;
        background-color: rgb(255, 190, 0);
        border: none;
        border-radius: 5px 5px 5px 5px;
        width: 20vw;
        height: 7vh;
        left: 5vw;
        top: 35vh;
    }

    .withdrawal-btn{
        position: absolute;
        background-color: white;
        border: none;
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

    .logo_img{
        position: absolute;
        width: 10vw;
        height: 15vh;
        left: 10vw;
        top: 7vh;
    }
`

const WithdrawalCardModal = () => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const handleClose = () => {
        dispatch(closeWithdrawalModal())
    };
    useOutSideClick(modalRef, handleClose);
    return (
        <ModalPortal>
            <WithdrawalModal ref={modalRef}>
                <div className="withdrawalCard">
                <button className="close-btn" onClick={() => {
                    dispatch(closeWithdrawalModal())
                }}>X</button>                  
                <img className="logo_img" src="images/bucketscombine_logo.png" alt="card" />
                <div className="withdrawal-message">만드신 카드는 모두 삭제됩니다. 정말 탈퇴하시겠습니까?ㅜㅜ</div>
                <button className="cancel-btn" onClick={() => {
                    dispatch(closeWithdrawalModal())
                }}>돌아가기</button>
                <button className="withdrawal-btn" onClick={() => {
                    dispatch(closeWithdrawalModal())
                }}>회원탈퇴</button>
                </div>
            </WithdrawalModal>
        </ModalPortal>
    );
}

export default WithdrawalCardModal;
