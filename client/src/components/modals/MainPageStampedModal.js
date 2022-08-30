import { closeMainStampedCardModal, setUsersData } from "../../redux/reducers/ModalReducer.js";
import { useSelector, useDispatch } from "react-redux";
import React, { useRef } from "react";
import useOutSideClick from "../hook/UseOutSideClick.js";
import styled from 'styled-components';
import ModalPortal from "./ModalPortal.js";
import HorizontalScroll from 'react-scroll-horizontal';
import { useMediaQuery } from "react-responsive";

const StampedModalWrap = styled.div`
    .modal-container {
        width: 70vw;
        max-width: 1200px;
        height: 60vh;
        min-height: 460px;
        max-height: 700px;
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

    .mainPageCard {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .card-img {
        margin-right: 30px;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        border: none;
        width: 260px;
        height: 390px;
        background-size: cover;
    }

    .modal-title {
        position: absolute;
        width: calc(100% - 370px);
        font-size: 28px;
        font-weight: 1000;
        top: 60px;
        left: 60px;
        margin: auto;
    }

    .card-tag  {
        position: absolute;
        width: calc(100% - 370px);
        left: 60px;
        top: 120px;
        font-size: 18px;
    }

    .userinfo {
        display: flex;
        flex-direction: row;
        position: absolute;
        height: 40px;
        width: calc(100% - 370px);
        left: 60px;
        top: 160px;
        font-size: 18px;
        overflow: auto;
        white-space: nowrap;
        ::-webkit-scrollbar {
        display: none;
        }
        
    }

    .userinfo-message {
        display: flex;
        flex-direction: row;
        position: absolute;
        height: 40px;
        width: calc(100% - 370px);
        left: 60px;
        top: 180px;
        color: grey;
        font-size: 14px;
        overflow: auto;
        white-space: nowrap;
        ::-webkit-scrollbar {
        display: none;
        }
        
    }

    .card-description {
        position: absolute;
        width: calc(100% - 370px);
        font-size: 16px;
        top: 240px;
        left: 60px;
    };

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

    .userInfo-btn {
        position: absolute;
        justify-content: center;
        background: none;
        border: none;
        width: 10vw;
        left: 1vw;
        top: 17vh;
    }
    
    .btn-confirm-btn {
        align-self: flex-end;
        margin-right: auto;
        background-color: #FFC700;
        border-radius: 10px;
        border: none;
        width: 120px;
        height: 30px;
        position: relative;
        left: 30px;
        bottom: 30px;
        font-size: 14px;
    }

    .username {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 15px;
    }

    .profile-image {
        background-color: #CCCCCC;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-left: 4px;
        margin-right: 14px;
    }

    .modal-container-mobile {
        width: 90vw;
        max-width: 1200px;
        height: 60vh;
        min-height: 460px;
        max-height: 700px;
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

    .card-img-mobile {
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        border: none;
        width: 0px;
        height: 0px;
        background-size: cover;
    }

    .modal-title-mobile {
        position: absolute;
        width: calc(100% - 70px);
        font-size: 28px;
        font-weight: 1000;
        top: 60px;
        left: 30px;
        margin: auto;
    }

    .card-tag-mobile  {
        position: absolute;
        width: calc(100% - 70px);
        left: 30px;
        top: 120px;
        font-size: 18px;
    }

    .userinfo-mobile {
        display: flex;
        flex-direction: row;
        position: absolute;
        height: 40px;
        width: calc(100% - 70px);
        left: 30px;
        top: 160px;
        font-size: 18px;
        overflow: auto;
        white-space: nowrap;
        ::-webkit-scrollbar {
        display: none;
        }
    }

    .card-description-mobile {
        position: absolute;
        width: calc(100% - 70px);
        font-size: 16px;
        top: 240px;
        left: 30px;
    };

    .userinfo-message-mobile {
        display: flex;
        flex-direction: row;
        position: absolute;
        height: 40px;
        width: calc(100% - 70px);
        left: 30px;
        top: 180px;
        color: grey;
        font-size: 14px;
        overflow: auto;
        white-space: nowrap;
        ::-webkit-scrollbar {
        display: none;
        }
    }
`    
    


const MainPageStampedModal = ({
    }) => {
    const isDesktop = useMediaQuery({ minWidth: 921 })
    const isTablet = useMediaQuery({ minWidth: 1201 })

    const modalCardID = useSelector((state) => state.modal.modalCardID);
    const {cardsData} = useSelector((state) => state.modal.cardsData);
    const {usersData} = useSelector((state) => state.modal.usersData);

    const { allCardsData } = useSelector((state) => state.modal.allCardsData);
    const allCardData = allCardsData.filter(card => card.id === modalCardID);
    
    const title = allCardData[0].title;
    const cardtext = allCardData[0].cardtext;
    let backgroundImageStyle = {
        backgroundImage: "url(" + allCardData[0].background + ")",
        backgroundPosition: 'center center',
    };
    const tags = allCardData[0].tag;

    const tagLine = tags.map((tag) => {
        return `#${tag}`;
    });

    
    const membersID = allCardData[0].membersID;

    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const handleClose = () => {
        dispatch(closeMainStampedCardModal())
    };
    useOutSideClick(modalRef, handleClose);

    const checkUserImage = (url) => {
        const urlForCheck = String(url)
        if(urlForCheck.includes('http')){
          return url
        } else {
          return 'images/base-user-image.jpg'
        }
      }

    return (
        <ModalPortal>
            <StampedModalWrap ref={modalRef}>
                <div className={isDesktop?"modal-container" : "modal-container-mobile" } >
                    <div className="mainPageCard" >
                        <h4 className={isTablet? " modal-title" : " modal-title-mobile"}>{title}</h4>                      
                        <div className={isTablet? "card-tag" : "card-tag-mobile"}>{tagLine.join(" ")}</div>
                        <div className={isTablet? "userinfo" : "userinfo-mobile"}>
                            {membersID.map((member, i) => {
                                const seletUser = usersData.filter((user) => user.id === member)[0]
                                return <div key={i} className="username">{seletUser.username}<img className="profile-image" src={checkUserImage(seletUser.userphotourl)}/></div>
                            })}
                        </div>
                        <button className="close-btn" onClick={() => {
                            dispatch(closeMainStampedCardModal())
                        }}>X</button>
                        <div className={isTablet?"card-img" : "card-img-mobile"} style={backgroundImageStyle} />
                        <div className={isTablet? "card-description" : "card-description-mobile"}>{cardtext}</div>
                    </div>
                </div>
            </StampedModalWrap>
        </ModalPortal>
    );
}

export default MainPageStampedModal;