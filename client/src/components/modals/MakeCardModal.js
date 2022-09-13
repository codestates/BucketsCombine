import { closeMakeCardModal, setUsersData, setStampedData } from "../../redux/reducers/ModalReducer.js";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import useOutSideClick from "../hook/UseOutSideClick.js";
import styled from 'styled-components';
import ModalPortal from "./ModalPortal.js";
import HorizontalScroll from 'react-scroll-horizontal';
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const MakeCardeModalWrap = styled.div`
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
    
    .make-card-button {
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
    }
    

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

  .failure-message {
    color: #FF5C00;
    align-self: flex-end;
    margin-right: auto;
    position: absolute;
    left: 170px;
    bottom: 34px;
    font-size: 16px;
    z-index: 2;
  }

  .failure-message-mobile {
    color: #FF5C00;
    align-self: flex-end;
    margin-right: auto;
    position: absolute;
    left: 30px;
    bottom: 60px;
    font-size: 16px;
    z-index: 2;
  }

  .card-tags  {
        position: absolute;
        width: calc(100% - 370px);
        height: 40px;
        left: 60px;
        top: 120px;
        font-size: 18px;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        ::-webkit-scrollbar {
        display: none;
        }
    }
  .card-tags-mobile  {
      position: absolute;
      width: calc(100% - 70px);
      height: 40px;
      left: 30px;
      top: 120px;
      font-size: 18px;
      display: flex;
        flex-direction: row;
        overflow-x: auto;
        ::-webkit-scrollbar {
        display: none;
        }
  }
  .tag {
    height: 20px;
    display: flex;
    flex-direction: row;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px ;
    font-size: 16px;
    color: #323232;
    padding: 5px 5px 5px 10px;
    margin-right: 2px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2) ;
    white-space: nowrap;
  }
  .x {
    border: none;
    box-shadow: none;
    margin-left: 5px;
    background-color: transparent;
  }
  .tag-input {
    position: absolute;
    left: 60px;
    top: 180px;
    height: 30px;
    width: calc(100% - 370px);
    background-color: transparent;
    border: none;
    box-shadow: none;
    font-size: 16px;
    :focus {
      outline: none;
    }
  }

  .tag-input-mobile {
    position: absolute;
    left: 30px;
    top: 180px;
    height: 30px;
    width: calc(100% - 70px);
    background-color: transparent;
    border: none;
    box-shadow: none;
    font-size: 16px;
    :focus {
      outline: none;
    }
  }

  .modal-title {
        position: absolute;
        width: calc(100% - 370px);
        font-size: 28px;
        font-weight: 1000;
        top: 60px;
        left: 60px;
        margin: auto;
        background-color: transparent;
        border: none;
    box-shadow: none;
    :focus {
      outline: none;
    }
    }
  
  .modal-title-mobile {
    position: absolute;
    width: calc(100% - 70px);
    font-size: 28px;
    font-weight: 1000;
    top: 60px;
    left: 30px;
    margin: auto;
    background-color: transparent;
    border: none;
    box-shadow: none;
    :focus {
      outline: none;
    }
  }

  .card-description {
    position: absolute;
    width: calc(100% - 390px);
    height: calc(100% - 350px);
    font-size: 16px;
    top: 240px;
    left: 60px;
    overflow-y: auto;
    background-color: transparent;
    border-radius: 10px;
    padding: 10px;
    :focus {
      outline: none;
    }
  };
  .card-description-mobile {
    position: absolute;
    width: calc(100% - 90px);
    height: calc(100% - 350px);
    font-size: 16px;
    top: 240px;
    left: 30px;
    overflow-y: auto;
    background-color: transparent;
    border-radius: 10px;
    padding: 10px;
    :focus {
      outline: none;
    }
  };

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
        color: white;
        text-align : center;
        line-height: 350px;
        font-size: 14px;
    }

    .card-img-mobile {
        position: absolute;
        border-radius: 20px;
        border: none;
        left: 180px;
        bottom: 30px;
        width: calc(100% - 220px);
        height: 30px;
        background-size: cover;
        background-position: center center;
        color: white;
        text-align : center;
        line-height: 30px;
        font-size: 14px;
    }

    .tag-message {
    color: #FF5C00;
    align-self: flex-end;
    margin-right: auto;
    position: absolute;
    left: 60px;
    top: 214px;
    font-size: 16px;
    z-index: 2;
  }

  .tag-message-mobile {
    color: #FF5C00;
    align-self: flex-end;
    margin-right: auto;
    position: absolute;
    left: 32px;
    top: 214px;
    font-size: 15px;
    z-index: 2;
  }
`

    


const MakeCardModal = ({
    }) => {


  const signInUserID = JSON.parse(localStorage.getItem('signInUserInfo')).id

  const isDesktop = useMediaQuery({ minWidth: 921 })
  const isTablet = useMediaQuery({ minWidth: 1201 })
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const [tagmessage, setTagmessage] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputInfo, setInputInfo] = useState('');
  const [inputTag, setInputTag] = useState([]);
  const [message, setMessage] = useState(false);
  const [bgImageStyle, setBgImageStyle] = useState(`${Math.floor(Math.random() * 18) + 1}`)
  const [tags, setTags] = useState([]);
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((el) => {
      return el !== tags[indexToRemove];
    }))
    setTagmessage(false)
  };


  const addTags = (event) => {
    setTagmessage(false)
    if(event.target.value.length > 30){
      event.target.value = event.target.value.slice(0, 30)
    }

    if(event.key === ' ' || event.key === 'Enter'){
      const value = event.target.value
      const tagforput = value.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,'').replace(/\ /g,'')

      if(tagforput !== ''){
        if(tags.length >= 10){
          if(event.key === ' '){
            event.target.value = event.target.value.slice(0, event.target.value.length - 1)
          }
          setTagmessage(true)
          return
        } else {
          if(tags.includes(tagforput)){
            event.target.value = '';
            return
          } else {
            setTags([...tags, tagforput])
            event.target.value = '';
            return
          }
        }
      } else {
        return
      }
    }
  }

  const handleClose = () => {
    confirmClosing()
  };

  useOutSideClick(modalRef, handleClose);
  
  const buildCard = () => {
    if (inputTitle === '' || inputInfo === '' || tags.length === 0) {
      setMessage(true);
    } else {
      if(!Array.isArray(tags)){
        return
      }
      const payload = {
        "title": inputTitle,
        "cardtext": inputInfo,
        "users_id": signInUserID,
        "background": bgImageStyle,
        "hashname": tags,
      }
      axios.post(`${process.env.REACT_APP_API_URL}/mypage/create`, payload)
      .then((res) => {
        dispatch(closeMakeCardModal())
        window.location.replace("/mypage")
      })
      .catch((err) => {
        alert(err)
      })
    }
  }

  const changeBgImage = () => {
    setBgImageStyle(`${Math.floor(Math.random() * 18) + 1}`)
    setMent("")
  }

  useEffect(() => {
    if(inputTitle!=='' && inputInfo !==''&& tags.length !== 0){
      setMessage(false)
    }
  }, [inputTitle, inputInfo, tags])


  const [ment, setMent] = useState(`배경을 변경하려면 클릭하세요.`)

  const confirmClosing = () => {
    if (inputTitle !== '' || inputInfo !== '' || tags.length !== 0){
      if(window.confirm("작성하신 내용이 삭제됩니다. 닫으시겠습니까?") === true){
        dispatch(closeMakeCardModal())
      } else {
        return ;
      }
    } else {
      dispatch(closeMakeCardModal())
    }
  }

  const titleFilter = (value) => {
    if(value.length > 30){
      const inputValue = value.slice(0, 30)
      setInputTitle(inputValue)
      return
    }

    setInputTitle(value)
  }

  const descriptionFilter = (value) => {
    if(value.length > 1000){
      const inputValue = value.slice(0, 1000)
      setInputInfo(inputValue)
      return
    }
    setInputInfo(value)
  }

  return (
    <ModalPortal>
      <MakeCardeModalWrap>
        <div className={isDesktop ? "modal-container" : "modal-container-mobile"} ref={modalRef} >
          <div className="mainPageCard" >
            {tagmessage? 
            <div className={isTablet? "tag-message" : "tag-message-mobile" }>태그는 10개까지 달 수 있습니다.</div>
          : <div/>}
            <input className={isTablet ? " modal-title" : " modal-title-mobile"} onChange={(e) => { titleFilter(e.target.value) }} value={inputTitle} placeholder="제목을 입력해 주세요."></input>
              <div className={isTablet ? "card-tags" : "card-tags-mobile"} >
                {tags.map((tag, index) => (
                  <div key={index} className='tag' onChange={(e) => { setInputTag(e.target.value) }}>
                    <div>#{tag}</div><button className="x"onClick={() => removeTags(index)}>x</button>
                  </div>
                ))}
              </div>
              <input
                className={isTablet? 'tag-input' : 'tag-input-mobile'}
                type='text'
                onKeyUp={(event) => { addTags(event) }}
                placeholder='태그를 입력해 주세요.'
              />
            <button className="close-btn" onClick={() => {
              dispatch(closeMakeCardModal())
            }}>X</button>
            <button type="button" className="make-card-button" onClick={buildCard}>
              카드 만들기
            </button>
            {message ? <div className={isTablet? "failure-message" : "failure-message-mobile" }>비어있는 부분이 있습니다.</div> : <div />}
            <div className={isTablet ? "card-img" : "card-img-mobile"} 
            style={{backgroundImage: "url(/images/card-" + bgImageStyle + ".jpg)"}} 
            onClick={changeBgImage}>
              {ment}
            </div>
          </div>
          <textarea className={isTablet ? "card-description" : "card-description-mobile"} onChange={(e) => { descriptionFilter(e.target.value) }} value={inputInfo} placeholder="설명을 입력해 주세요."></textarea>
        </div>
      </MakeCardeModalWrap>
    </ModalPortal>
  );
}

export default MakeCardModal;