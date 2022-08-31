import { closeWithdrawalModal } from "../../redux/reducers/ModalReducer";
import { useDispatch } from "react-redux";
import ModalPortal from "./ModalPortal";
import React, { useRef } from "react";
import useOutSideClick from "../hook/UseOutSideClick.js";
import styled from "styled-components";
import axios from 'axios';

const WithdrawalModal = styled.div`
    .withdrawalCard{
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

    .withdrawalCard-mobile{
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

    .withdrawal-message{
        text-align: center;
    }

    .cancel-btn{
        position: absolute;
        background-color: rgb(255, 190, 0);
        border: none;
        border-radius: 10px;
        top: 400px;
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

    .withdrawal-btn{
        position: absolute;
        background-color: transparent;
        border: none;
        border-radius: 10px;
        top: 350px;
        width: 80px;
        height: 30px;
        bottom: 50px;
        :hover{
          box-shadow:  3px 3px 6px rgba(0,0,0,0.2);
          transition: box-shadow 0.2s;
        }

        :active{
          box-shadow:  inset 3px 3px 6px rgba(0,0,0,0.2);
        }
    }

    .usingPassword {
        position: absolute;
        width: 20vw;
        height: 3vh;
        left: 5vw;
        top: 30vh;
    }
`

const WithdrawalCardModal = () => {
  const signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
  const isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const handleClose = () => {
    dispatch(closeWithdrawalModal())
  };
  useOutSideClick(modalRef, handleClose);

  const withdrawal = () => {
    if (isSignIn) {
      axios.delete(`${process.env.REACT_APP_API_URL}/mypage/deletuser`, {
        data: {
          'users_id': signInUserInfo.users_id,
        },
        withCredentials: true,
      })
        .then(() => {
          dispatch(closeWithdrawalModal())
          localStorage.setItem('signInUserInfo', JSON.stringify(null));
          localStorage.setItem('isSignIn', JSON.stringify(false));
          window.location.replace("/");

        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  return (
    <ModalPortal>
      <WithdrawalModal ref={modalRef}>
        <div className="withdrawalCard">
          <button className="close-btn" onClick={() => {
            dispatch(closeWithdrawalModal())
          }}>X</button>
          <img className="logo_img" src="images/bucketscombine_logo.png" alt="card" />
          <div className="withdrawal-message">만드신 카드는 모두 삭제됩니다. <br />탈퇴하시겠습니까?</div>
          <button className="cancel-btn" onClick={() => {
            dispatch(closeWithdrawalModal())
          }}>돌아가기</button>
          <button className="withdrawal-btn" onClick={withdrawal}>회원탈퇴</button>
        </div>
      </WithdrawalModal>
    </ModalPortal>
  );
}

export default WithdrawalCardModal;
