import { closeMainPageCardModal, setUsersData } from "../../redux/reducers/ModalReducer.js";
import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useState } from "react";
import useOutSideClick from "../hook/UseOutSideClick.js";
import styled from 'styled-components';
import ModalPortal from "./ModalPortal.js";
import HorizontalScroll from 'react-scroll-horizontal';
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const MainPageModal = styled.div`
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

    .card-subtract-button {
        align-self: flex-end;
        margin-right: auto;
        background-color: #8A8A8A;
        border-radius: 10px;
        border: none;
        width: 120px;
        height: 30px;
        position: relative;
        left: 30px;
        bottom: 30px;
        font-size: 14px;
        color: white;
    }
    .card-insert-button {
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
`



const MainPageCardModal = ({
}) => {
  const isSignIn = JSON.parse(localStorage.getItem('isSignIn'))

  const isDesktop = useMediaQuery({ minWidth: 921 })
  const isTablet = useMediaQuery({ minWidth: 1201 })

  const modalCardID = useSelector((state) => state.modal.modalCardID);
  const modalUserID = useSelector((state) => state.modal.modalUserID);
  const isInBucketModal = useSelector((state) => state.modal.isInBucketModal);

  const [isInBucket, setIsInBucket] = useState(isInBucketModal)

  const { allCardsData } = useSelector((state) => state.modal.allCardsData);
  const allCardData = allCardsData.filter(card => card.id === modalCardID);

  const [isChanged, setIsChanged] = useState(false)

  const title = allCardData[0].title;
  const cardtext = allCardData[0].cardtext;
  let backgroundImageStyle = {
    backgroundImage: "url(/images/card-" + allCardData[0].background + ".jpg)",
  };
  const tags = allCardData[0].tag;

  const tagLine = tags.map((tag) => {
    return `#${tag}`;
  });


  const membersID = allCardData[0].membersID;

  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const handleClose = () => {
    dispatch(closeMainPageCardModal())
    if(isChanged){
      window.location.reload()
    }
  };
  useOutSideClick(modalRef, handleClose);



  
  let signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))

  const isOwn = (signInUserInfo, modalUserID) => {
    if(signInUserInfo.id){
      return signInUserInfo.id === modalUserID
    } else {
      return false
    }
  } 

  const putInBucket = (id) => {
    id.stopPropagation();
    
    axios.post(`${process.env.REACT_APP_API_URL}/mainpage/userCardJoins`, {
      cards_id: modalCardID,
      users_id: signInUserInfo.id,
    })
      .then((res) => {
        setIsInBucket(true);
        setIsChanged(!isChanged)
      })
      .catch((err) => {
        alert(err)
      })
  };

  const pullOutBucket = (id) => {
    id.stopPropagation();

    axios.delete(`${process.env.REACT_APP_API_URL}/mainpage/userCardJoinsdelete`, {
      data: {
        cards_id: modalCardID,
        users_id: signInUserInfo.id,
      },
      withCredentials: true,
    })
      .then((res) => {
        setIsInBucket(false);
        setIsChanged(!isChanged)
      })
      .catch((err) => {
        alert(err)
      })
  };

  return (
    <ModalPortal>
      <MainPageModal ref={modalRef}>
        <div className={isDesktop ? "modal-container" : "modal-container-mobile"} >
          <div className="mainPageCard" >
            <h4 className={isTablet ? " modal-title" : " modal-title-mobile"}>{title}</h4>
            <div className={isTablet ? "card-tag" : "card-tag-mobile"}>{tagLine.join(" ")}</div>
            {/* <div className={isTablet ? "userinfo" : "userinfo-mobile"}>
              {membersID.map((member, i) => {
                const username = usersData[member - 1].username;
                const userphoto = usersData[member - 1].userphotourl;
                return <div key={i} className="username">{username}<img className="profile-image" src={userphoto} /></div>
              })}
            </div> */}
            <div className={isTablet ? "userinfo-message" : "userinfo-message-mobile"}>
              참여 인원 {membersID.length}명 (참여하시면 My Bucket에서 참여하신 분들의 정보를 볼 수 있습니다.)
            </div>
            <button className="close-btn" onClick={handleClose}>X</button>
            {isSignIn ?
              isOwn(signInUserInfo, modalUserID) ?
                <div />
                : isInBucket ?
                  <button type="button" className="card-subtract-button"
                    onClick={pullOutBucket}>
                    빼기 및 참여취소
                  </button>
                  : <button type="button" className="card-insert-button"
                    onClick={putInBucket}>
                    담기 및 참여
                  </button>
              : <div />
            }
            <div className={isTablet ? "card-img" : "card-img-mobile"} style={backgroundImageStyle} />
            <div className={isTablet ? "card-description" : "card-description-mobile"}>{cardtext}</div>
          </div>
        </div>
      </MainPageModal>
    </ModalPortal>
  );
}

export default MainPageCardModal;