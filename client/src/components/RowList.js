import { useCallback, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import HorizontalScroll from 'react-scroll-horizontal';
import RowCard from "./RowCard";
import Loader from "./Loader";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { setCardsData, setAllcardsData, setUsersData } from '../redux/reducers/ModalReducer'
import { useRef } from 'react';


const RowListWrap = styled.div`
  #card-list {
    width: calc(100vw - 240px);
    height: 400px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
  }

  .dummy {
    width: 10px;
    height: 100px;
  }

  .Target-Element {
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .search-bar {
    align-self: center;
    position: relative;
    top: 50px;
    margin-left: 0px;
    width: 40vw;
    min-width: 500px;
    z-index: 2;
  }

  .search-input {
    width: 100%;
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    :focus {
      outline: none;
    }
  }

  .search-icon {
    position : absolute;
    width: 17px;
    top: 10px;
    right: 0px;
    margin: 0px;
  }

  #card-list-mobile {
    width: calc(100vw - 100px);
    height: 400px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
  }

  .search-bar-mobile {
    align-self: center;
    position: relative;
    top: 10px;
    margin-left: 0px;
    width: 80%;
    min-width: 260px;
    z-index: 1;
  }
  .dummyarea {
    height: 100%;
    width: calc(0vw - 240px);
  }

  #card-list-line {
    display: flex;
    height: 100%;
    flex-direction: row;
    overflow-x: auto;
    ::-webkit-scrollbar {
        display: none;
        }
  }

  .leftScroll {
    position: absolute;
    left: 0px;
    bottom: 300px;
    width: 30px;
    height: 90px;
    z-index: 10;
  }

  .rightScroll {
    position: absolute;
  }
`;


export default function RowList () {
  
  let signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
  let isSignIn = JSON.parse(localStorage.getItem('isSignIn'))

  const isDesktop = useMediaQuery({ minWidth: 921 })

  const dispatch = useDispatch();

  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("");
  const [bucketIDDataS, SetBucketIDDataS] = useState(null)

  const dummyarea = document.querySelector('.dummyarea')

  const saveData = (responseAllCards, responseUsers, responseBucketID) => {
    
    const allCardsData = responseAllCards.data;
    const usersData = responseUsers.data;
    const bucketIDData = responseBucketID.data;
    const cardsData = allCardsData.filter((card) => card.stamped[0] === null)

    const reverseCardsData = cardsData.slice().reverse()

    SetBucketIDDataS(bucketIDData)

    dispatch(setCardsData(reverseCardsData));
    dispatch(setAllcardsData({ allCardsData }));
    dispatch(setUsersData({ usersData }));

    setCards(
      reverseCardsData.map((card, i) => {
        return <RowCard
          key={i}
          cardID={card.id}
          writername={usersData[card.users_id - 1].username}
          userID={card.users_id}
          title={card.title}
          cardtext={card.cardtext}
          background={card.background}
          createdAt={card.createdAt}
          completed={card.completed}
          tags={card.tag}
          membersID={card.membersID}
          userbucketCardID={bucketIDData}
        />;
      }))
    setUsers(usersData)
  }

  useEffect(() => {async function fetchData() {
    const responseAllCards = await axios.get(`${process.env.REACT_APP_API_URL}/mainpage/cardinfo`)
    const responseUsers = await axios.get(`${process.env.REACT_APP_API_URL}/mypage/usersinfo`)
    const responseBucketID = await axios.post(`${process.env.REACT_APP_API_URL}/mypage/mycards`,{
      "users_id" : signInUserInfo.id
    })
    const sendData = await saveData(responseAllCards,responseUsers, responseBucketID )
  } fetchData()}, []);

  
  const cardsData = useSelector((state) => state.modal.cardsData);
  const {usersData} = useSelector((state) => state.modal.usersData);
  const signInUserId = useSelector((state) => state.modal.signInUserId);

  const searchCard = () => {
    const titleMatchData = cardsData.filter((card) => card.title.includes(search))
    const tagMatchData = cardsData.filter((card) => card.tag.includes(search))
    const mergeData = [...titleMatchData, ... tagMatchData]
    const set = new Set(mergeData)
    const searchedData = [...set]
    const searchedCards = searchedData.map((card, i) => {
      return <RowCard
        key={i}
        cardID={card.id}
        writername={usersData[card.users_id - 1].username}
        userID={card.users_id}
        title={card.title}
        cardtext={card.cardtext}
        background={card.background}
        createdAt={card.createdAt}
        completed={card.completed}
        tags={card.tag}
        membersID={card.membersID}
        userbucketCardID={bucketIDDataS}
      />;
    })
    setCards(searchedCards)
  }

  const enterSearchCard = (e) => {
    if(e.key === 'Enter'){
      const titleMatchData = cardsData.filter((card) => card.title.includes(search))
      const tagMatchData = cardsData.filter((card) => card.tag.includes(search))
      const mergeData = [...titleMatchData, ... tagMatchData]
      const set = new Set(mergeData)
      const searchedData = [...set]
      const searchedCards = searchedData.map((card, i) => {
        return <RowCard
          key={i}
          cardID={card.id}
          writername={usersData[card.users_id - 1].username}
          userID={card.users_id}
          title={card.title}
          cardtext={card.cardtext}
          background={card.background}
          createdAt={card.createdAt}
          completed={card.completed}
          tags={card.tag}
          membersID={card.membersID}
          userbucketCardID={bucketIDDataS}
        />;
      })
      setCards(searchedCards)
    }
  }
  

  const ele = document.querySelector("#card-list-line");

  const leftScroll = () => {
    const currentScroll = ele.scrollLeft
    const currentWidth = ele.offsetWidth
    ele.scrollTo({ behavior: 'smooth', left:currentScroll - currentWidth });
  }

  const rightScroll = () => {
    const currentScroll = ele.scrollLeft
    const currentWidth = ele.offsetWidth
    ele.scrollTo({ behavior: 'smooth', left:currentScroll + currentWidth });
  }

  return (
    <RowListWrap >
      <div id={isDesktop ? 'card-list' : 'card-list-mobile'} >
        <div id="card-list-line">
        {cards}
        </div>
        <div className={isDesktop? 'search-bar' : 'search-bar-mobile'}>
          <input className='search-input' type="text" placeholder="제목 및 태그" onChange={(e) => {
            setSearch(e.target.value)
          }} onKeyUp={enterSearchCard}/>
          <img className='search-icon' src='/images/search-icon.png' onClick={searchCard}/>
          <button className="leftScroll" onClick={leftScroll}>{"<"}</button>
        <button className="rightScroll" onClick={rightScroll}>{">"}</button>
        </div>
        
      </div>
    </RowListWrap>
  );
};
