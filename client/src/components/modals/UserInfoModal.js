import { closeUserInfoModal, openMyCardModal, openMyStampedModal } from "../../redux/reducers/ModalReducer";
import { useSelector, useDispatch } from "react-redux";
import ModalPortal from "./ModalPortal";
import useOutSideClick from "../hook/UseOutSideClick";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const UserInfoModalWrap = styled.div`
    .UserInfoCard{
        width: 450px;
        height: 60vh;
        min-height: 460px;
        max-height: 600px;
        display: flex;
        border-radius: 20px ;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        margin-left: 60px;
        z-index: 10;
        border: solid #5E5E5E;
        border-width: 1px;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        animation: fadein 0.3s;
        -moz-animation: fadein 0.3s;
        -webkit-animation: fadein 0.3s;
        -o-animation: fadein 0.3s;
        box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);

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

    .UserInfoCard-mobile {
        width: 450px;
        height: 60vh;
        min-height: 460px;
        max-height: 600px;
        display: flex;
        border-radius: 20px ;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 10;
        border: solid #5E5E5E;
        border-width: 1px;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        animation: fadein 0.3s;
        -moz-animation: fadein 0.3s;
        -webkit-animation: fadein 0.3s;
        -o-animation: fadein 0.3s;
        box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
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
        z-index: 50;
    }

    .user-img{
        position: absolute;
        border: solid #8A8A8A;
        border-width: 1px;
        border-radius: 20px;
        width: 150px;
        height: 150px;
        left: 30px;
        top: 30px;
        background-position: center center;
        background-size: cover;
    }

    .useremail{
        position: absolute;
        left: 200px;
        top: 90px;
    }
    
    .username{
        position: absolute;
        font-size: 26px;
        left: 200px;
        top: 50px;   
    }

    .user-age{
        position: absolute;
        border: solid rgb(170, 170, 170);
        border-width: 2px;
        border-radius: 10px;
        text-align: center;
        width: 70px;
        height: 20px;
        left: 200px;
        top: 140px;
    }

    .user-gender{
        position: absolute;
        border: solid rgb(170, 170, 170);
        border-width: 2px;
        border-radius: 10px;
        text-align: center;
        width: 70px;
        height: 20px;
        left: 280px;
        top: 140px;
    }

    .user-introduction{
        text-align: left;
        position: absolute;
        background: transparent;
        width: calc(100% - 80px);
        height: calc(100% - 260px);
        left: 35px;
        top: 220px;
    }

    .exile-btn{
        position: absolute;
        display: flex;
        background: none;
        border: none;
        color: #969696;
        right: 1px;
        top: 55vh;
    }

`

const UserInfoCardModal = () => {
    const isDesktop = useMediaQuery({ minWidth: 921 })

    const {usersData} = useSelector((state) => state.modal.usersData)
    const selectUserID = useSelector((state) =>state.modal.selectUserID)
    const [selectUserInfo] = usersData.filter((user) => user.id === selectUserID )

    let backgroundImageStyle = {
        backgroundImage: `url(${selectUserInfo.userphotourl})`,
    };

    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const handleClose = () => {
        dispatch(closeUserInfoModal())
    };
    useOutSideClick(modalRef, handleClose);
    return (
        <ModalPortal>
            <UserInfoModalWrap>
                <div className={isDesktop? "UserInfoCard" : "UserInfoCard-mobile"} ref={modalRef}>
                <button className="close-btn" onClick={handleClose}>X</button>
                <div className="user-img" style={backgroundImageStyle}/>
                <div className="useremail">{selectUserInfo.email}</div>
                <div className="username">{selectUserInfo.username}</div>
                <div className="user-age">{selectUserInfo.age}</div>
                <div className="user-gender">{selectUserInfo.gender}</div>
                <div className="user-introduction">{selectUserInfo.usertext}</div>
                </div>
            </UserInfoModalWrap>
        </ModalPortal>
    );
}

export default UserInfoCardModal;