import { closeMyCardModal, openEditCardModal, openUserInfoModal, setSelectUserID, setUsersData, setStampedData } from "../../redux/reducers/ModalReducer";
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
        background-position: center center;
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
        background-position: center center;
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
        top: 130px;
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

    .ColumnCard-progress-0 {
    position: absolute;
    background-color: #8A8A8A;
    height: 80px;
    width: 10px;
    border-radius: 10px;
    top:20px;
    left: 10px;
  }

  .ColumnCard-progress-1 {
    position: absolute;
    background-color: #FFC700;
    height: 80px;
    width: 10px;
    border-radius: 10px;
    top:20px;
    left: 10px;
  }

  .ColumnCard-progress-2 {
    position: absolute;
    background-color: #FF5C00;
    height: 80px;
    width: 10px;
    border-radius: 10px;
    top:20px;
    left: 10px;
  }

  .delete-button {
    height: 30px;
    width: 80px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    border: none;
    border-radius: 10px;
    background-color: white;
    color:gray;
    font-weight: bold;
    font-size: 14px;
    z-index: 2;
  }

  .progress-board-0 {
    background-color: #8A8A8A;
    height: 24px;
    width: 120px;
    border-radius: 12px;
    position: absolute;
    top: 30px;
    right: 30px;
    color: white;
    text-align: center;
    line-height: 23px;
  }

  .progress-board-1 {
    background-color: #FFC700;
    height: 24px;
    width: 120px;
    border-radius: 12px;
    position: absolute;
    top: 30px;
    right: 30px;
    color: white;
    text-align: center;
    line-height: 23px;
  }

  .progress-board-2 {
    background-color: #FF5C00;
    height: 24px;
    width: 120px;
    border-radius: 12px;
    position: absolute;
    top: 30px;
    right: 30px;
    color: white;
    text-align: center;
    line-height: 23px;
  }
  .switchPrevious {
    position: absolute;
    left: 10px;
    height: 100%;
    width: 40px;
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: white;
  }

  .switchNext {
    position: absolute;
    right: 10px;
    height: 100%;
    width: 40px;
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: white;
  }
  .imgUploadButton {
    position: absolute;
    right: 170px;
    top: 30px;
    height: 24px;
    width: 120px;
    border-radius: 12px;
    border: none;
    color:white;
    background-color: #FF5C00;
    text-align: center;
  }

  .imgUploadButton label {
    font-size: 16px;
  }

  .imgUploadButton input[type="file"] { 
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  }

  .stampedButton {
    position: absolute;
    right: 310px;
    top: 30px;
    height: 24px;
    width: 120px;
    border-radius: 12px;
    border: none;
    color:white;
    text-align: center;
    line-height: 20px;
    animation-duration: 3s; animation-name: rainbowLink; animation-iteration-count: infinite; } 
    @keyframes rainbowLink {     
    0% { background-color: #eeafaf; }
    15% { background-color: #f3cda0; }
    30% { background-color: #afcb3d; }
    45% { background-color: #d3c0d3; }
    60% { background-color: #f7e7b1; }
    75% { background-color: #a9e1ed; }
    90% { background-color: #fdc4f8; } 
    100% { background-color: #cb9ffd; }
  }

  .edit-button {
    align-self: flex-end;
    margin-right: auto;
    background-color: #ffc700;
    border-radius: 10px;
    border: none;
    width: 120px;
    height: 30px;
    position: relative;
    left: 30px;
    bottom: 30px;
    font-size: 14px;
  }

  .subtract-button {
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

  .insert-button {
    align-self: flex-end;
    margin-right: auto;
    background-color: #ffc700;
    border-radius: 10px;
    border: none;
    width: 120px;
    height: 30px;
    position: relative;
    left: 30px;
    bottom: 30px;
    font-size: 14px;
  }

  .complete-stamp {
    position: absolute;
    width: 150px;
    right: 0px;
    transform: translate(0,250px);
  }

  .image {
    position: absolute;
    width: 200px;
    height: 200px;
  }
`    
    


const MyCardModal = ({
  }) => {
  const isDesktop = useMediaQuery({ minWidth: 921 })
  const isTablet = useMediaQuery({ minWidth: 1201 })

  const [isChangeJoin , setIsChangeJoin] = useState(false)

  const modalCardID = useSelector((state) => state.modal.modalCardID);
  const cardsData = useSelector((state) => state.modal.bucketData);
  const {usersData} = useSelector((state) => state.modal.usersData);

  const isOpenUserInfo = useSelector((state) => state.modal.isOpenUserInfo);

  const cardData = cardsData.filter(card => card.id === modalCardID);
  const title = cardData[0].title;
  const completed = cardData[0].completed
  const cardtext = cardData[0].cardtext;
  let backgroundImageStyle = {
      backgroundImage: "url(/images/card-" + cardData[0].background + ".jpg)",
  };
  let stampedBackgroundImageStyle = {
    backgroundImage: "url(" + cardData[0].background + ")",
};
  const tags = cardData[0].tag;

  const tagLine = tags.map((tag) => {
      return `#${tag}`;
  });

  
  const membersID = cardData[0].membersID;

  const dispatch = useDispatch();
  

  const cardWriterID = cardData[0].users_id
  const signInUserID = JSON.parse(localStorage.getItem('signInUserInfo')).id

  const confirmDelete = () => {
    if(window.confirm("참여 중인 분들도 카드를 잃게 됩니다. 정말 삭제하시겠습니까?") === true){
      axios.delete(`${process.env.REACT_APP_API_URL}/mypage/deletecard`, {
        data: {
          cards_id: modalCardID
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(closeMyCardModal())
        window.location.reload()
      })
      .catch((error) => {
        alert(error)
      })
    } else {
      return ;
    }
  }

  const [complete, setComplete] = useState(completed)

  const nextlevel = () => {
    const level = Number(complete) + 1
    setComplete(String(level))
  }
  const previouslevel = () => {
    const level = Number(complete) - 1
    setComplete(String(level))
  }

  const closeModal = () => {
    if(isOpenUserInfo){
      return ;
    } else {
      if(complete !== completed){
        axios.patch(`${process.env.REACT_APP_API_URL}/mypage/cardsedit`, {
          cards_id: modalCardID,
          title: title,
          cardtext: cardtext,
          background: cardData[0].background,
          hashname: tags,
          completed:complete,
        })
        .then((res) => {
          dispatch(closeMyCardModal())
          window.location.reload()
        })
        .catch((error) => {
          alert(error)
        })
      } else {
        dispatch(closeMyCardModal())
      }
    }
    
  }
  
  const modalRef = useRef(null);
  useOutSideClick(modalRef, closeModal);

  const [isInBucket, setIsInBucket] = useState(true)

  const putInBucket = (id) => {
    id.stopPropagation();

    setIsChangeJoin(!isChangeJoin)
    setIsInBucket(true)
  };

  const pullOutBucket = (id) => {
    id.stopPropagation();

    setIsChangeJoin(!isChangeJoin)
    setIsInBucket(false)
  };

  const notMyCardModalRef = useRef(null);
  const closeNotMyCardModal = () => {
    if(isOpenUserInfo){
      return ;
    } else {
      if(isChangeJoin){
        axios.delete(`${process.env.REACT_APP_API_URL}/mainpage/userCardJoinsdelete`, {
          data: {
            cards_id: modalCardID,
            users_id: signInUserID,
          },
          withCredentials: true,
        })
        .then((res) => {
          dispatch(closeMyCardModal())
          window.location.reload()
        })
      } else {
        dispatch(closeMyCardModal())
      }
    }
    
  };

  useOutSideClick(notMyCardModalRef, closeNotMyCardModal);


  const editCard = () => {
    dispatch(openEditCardModal())
    dispatch(closeMyCardModal())
  }

  const [ imageSrc, setImageSrc ] = useState('');
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  let backgroundImageStyleUploaded = {
    backgroundImage: `url(${imageSrc})`,
    backgroundPosition: 'center center',
  };

  

  const isStamped = cardData[0].stamped[0] !== null

  const openUserInfo = (seletUserID) => {
    dispatch(setSelectUserID(seletUserID))
    dispatch(openUserInfoModal())
  }

  const makeStamped = async (res) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/mypage/addstamps`, {
      cards_id: modalCardID,
    })
    await axios.patch(`${process.env.REACT_APP_API_URL}/mypage/cardsedit`, {
      cards_id: modalCardID,
      title: title,
      cardtext: cardtext,
      background: res,
      hashname: tags,
      completed:complete,
    })
    .then((res) => {
      dispatch(closeMyCardModal())
      window.location.reload()
    })
  }



  const [imageFile, setImageFile] = useState("");


  const updateImageFile = async (e) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("cards_id", modalCardID)
    console.log(formData)
    const config = {
        Headers: {
          "content-type": "multipart/form-data",
        },
      };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/image/cardImageUpload`,
        formData,
        config,
      )
      .then((res) => {
        makeStamped(res)
      })
      .catch((err) => alert(err));
  };

  const checkUserImage = (url) => {
    const urlForCheck = String(url)
    if(urlForCheck.includes('http')){
      return url
    } else {
      return 'images/base-user-image.jpg'
    }
  }

  if(cardWriterID === signInUserID){
    return (
      <ModalPortal>
        <MainPageModal ref={modalRef}>
          <div className={isDesktop ? "modal-container" : "modal-container-mobile"} >
            <div className="mainPageCard" >
              {imageSrc === ''? <div/> : <div className="stampedButton" onClick={updateImageFile}>도장 찍기</div>}
            {isStamped? <div/>
            : complete === '2'? 
            <div className="imgUploadButton">
            <label htmlFor="ex_file">{imageSrc === ""? '사진 올리기' : '사진 변경' }</label>
            <input type='file' id='ex_file' accept='image/*' onChange={(e) => {
              encodeFileToBase64(e.target.files[0]);
              setImageFile(e.target.files[0]);
            }} placeholder='사진'/>
            </div>
            : <div/>}
            {isStamped? <div/> :
              <div className={
                complete === '0' ? 'ColumnCard-progress-0'
                  : complete === '1' ? 'ColumnCard-progress-1'
                    : 'ColumnCard-progress-2'
              } />
            }
              {isStamped? <div/> 
              : <div className={
                complete === '0' ? 'progress-board-0'
                  : complete === '1' ? 'progress-board-1'
                    : 'progress-board-2'
              } 
              >{complete !== '0'? <button className="switchPrevious" onClick={previouslevel}>{'<'}</button> : <div className="switchPrevious"/>}{
                complete === '0'? '대기중'
              : complete === '1' ? '진행중'
              : '달성'
              }{complete !== '2'? <button className="switchNext" onClick={nextlevel}>{'>'}</button> : <div className="switchNext"/>}
              </div>}
              <h4 className={isTablet ? " modal-title" : " modal-title-mobile"}>{title}</h4>
              <div className={isTablet ? "card-tag" : "card-tag-mobile"}>{tagLine.join(" ")}</div>
              <div className={isTablet ? "userinfo" : "userinfo-mobile"}>
                {membersID.map((member, i) => { 
                  const seletUser = usersData.filter((user) => user.id === member)[0]
                  return (
                    <div key={i} className="username" onClick={() => openUserInfo(seletUser.id)}>
                    {seletUser.username}
                    <img className="profile-image" src={checkUserImage(seletUser.userphotourl)} />
                  </div>
                  )
                })}
              </div>
              <button className="close-btn" onClick={closeModal}>X</button>
              {isStamped? <div/> 
              : <button type="button" className="edit-button" onClick={editCard}>
                카드 수정
              </button>}
              <button type="button" className="delete-button" onClick={confirmDelete}>
                {'카드 삭제 >'}
              </button>
              {isStamped? 
              <div className={isTablet ? "card-img" : "card-img-mobile"} style={stampedBackgroundImageStyle}>
              {isStamped && isTablet? <img className="complete-stamp" src="images/complete-stamp.png"/> : <div/>}
              </div>
              :
              <div className={isTablet ? "card-img" : "card-img-mobile"} style={imageSrc === ''? backgroundImageStyle : backgroundImageStyleUploaded}>
              {isStamped && isTablet? <img className="complete-stamp" src="images/complete-stamp.png"/> : <div/>}
              </div>
              }
               
              <div className={isTablet ? "card-description" : "card-description-mobile"}>{cardtext}</div>
            </div>
          </div>
        </MainPageModal>
      </ModalPortal>
    );
  } else {
    return (
      <ModalPortal>
        <MainPageModal ref={notMyCardModalRef}>
          <div className={isDesktop ? "modal-container" : "modal-container-mobile"} >
            <div className="mainPageCard" >
            {isStamped? <div/> :
              <div className={
                complete === '0' ? 'ColumnCard-progress-0'
                  : complete === '1' ? 'ColumnCard-progress-1'
                    : 'ColumnCard-progress-2'
              } />
            }
              <h4 className={isTablet ? " modal-title" : " modal-title-mobile"}>{title}</h4>
              <div className={isTablet ? "card-tag" : "card-tag-mobile"}>{tagLine.join(" ")}</div>
              <div className={isTablet ? "userinfo" : "userinfo-mobile"}>
              {membersID.map((member, i) => { 
                  const seletUser = usersData.filter((user) => user.id === member)[0]
                  return (
                    <div key={i} className="username" onClick={() => openUserInfo(seletUser.id)}>
                    {seletUser.username}
                    <img className="profile-image" src={checkUserImage(seletUser.userphotourl)} />
                  </div>
                  )
                })}
              </div>
              <button className="close-btn" onClick={closeNotMyCardModal}>X</button>
              {isInBucket? 
              <button type="button" className="subtract-button" onClick={pullOutBucket}>
              카드 빼기
              </button>
              :
              <button type="button" className="insert-button" onClick={putInBucket}>
                카드 다시 담기
              </button>}
              <div className={isTablet ? "card-img" : "card-img-mobile"} style={backgroundImageStyle}>
              {isStamped && isTablet? <img className="complete-stamp" src="images/complete-stamp.png"/> : <div/>}
              </div>
              <div className={isTablet ? "card-description" : "card-description-mobile"}>{cardtext}</div>
            </div>
          </div>
        </MainPageModal>
      </ModalPortal>
    );
  }
  
}

export default MyCardModal;