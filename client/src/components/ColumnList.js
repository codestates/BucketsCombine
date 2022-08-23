import { useCallback, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ColumnCard from "./ColumnCard";
import Loader from "./Loader";
import { openMakeCardModal } from "../redux/reducers/ModalReducer.js";
import { useDispatch, useSelector } from "react-redux";
import MakeModal from "./modals/MakeCardModal";
import { useMediaQuery } from "react-responsive";
import axios from 'axios'
import { setCardsData, setUsersData, setAllcardsData, setBucketData } from '../redux/reducers/ModalReducer'


const ColumnListWrap = styled.div`
  #card-list-column {
  width: 70vw;
  max-width: 1000px;
  height: calc(100vh - 400px) ;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 30px;
  }

  #card-list-column-mobile {
  width: 100vw;
  max-width: 1000px;
  height: calc(100vh - 400px) ;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 30px;
  }

  #columnList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    align-items: center;
    overflow-y: auto;
    padding: 10px;
  }

  .Target-Element {
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .create-card-button {
    width: calc(70vw - 40px);
    max-width: 960px;
    height: 80px;
    border-radius: 15px;
    border: none;
    box-shadow: none;
    font-size: 32px;
    background-color: #d2d2d2;
    margin: 5px;
    line-height: 80px;
    text-align: center;
    align-self: flex-start;
    margin-left: 30px;
    margin-top: 20px;
  }

  .create-card-button-mobile {
    width: calc(95vw - 40px);
    height: 80px;
    border-radius: 15px;
    border: none;
    box-shadow: none;
    font-size: 32px;
    background-color: #d2d2d2;
    margin: 5px;
    line-height: 80px;
    text-align: center;
    align-self: center;
    margin-left: 25px;
    margin-top: 20px;
  }

  .column-search-bar {
    height: 10px;
    width: 70%;
    position: absolute;
    bottom: -50px;
  }

  .column-search-input {
    width: 100%;
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    :focus {
      outline: none;
    }
  }

  .column-search-icon {
    position : absolute;
    width: 17px;
    top: 10px;
    right: 0px;
    margin: 0px;
  }

  .column-search-bar-mobile {
    height: 10px;
    width: 70%;
    position: absolute;
    bottom: -50px;
    left: 13%;
  }

  #columnList-mobile {
    width: 92%;
    margin-left: 2%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    align-items: center;
    overflow-y: auto;
    padding: 10px;
  }
`;

export default function ColumnList () {
  let signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
  let isSignIn = JSON.parse(localStorage.getItem('isSignIn'))

  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({ minWidth: 921 })


  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const saveData = (responseAllCards, responseUsers, responseBucketID) => {
    const allCardsData = responseAllCards.data;
    const usersData = responseUsers.data;
    const bucketIDData = responseBucketID.data;

    const bucketCardsData = allCardsData.filter((card) => {
      for(let i of bucketIDData){
        if(card.id === i) return true
      }
      return false
    })
    const reverseBucketCardsData = bucketCardsData.slice().reverse()

    dispatch(setAllcardsData({ allCardsData }));
    dispatch(setUsersData({ usersData }));
    dispatch(setBucketData( reverseBucketCardsData ))

    
    setCards(
      reverseBucketCardsData.map((card, i) => {
      return <ColumnCard
        key={i}
        cardID={card.id}
        writername={usersData[card.users_id - 1].username}
        title={card.title}
        cardtext={card.cardtext}
        background={card.background}
        createdAt={card.createdAt}
        completed={card.completed}
        tags={card.tag}
        membersID={card.membersID}
        stamped={card.stamped[0]}
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
    const sendData = await saveData(responseAllCards, responseUsers, responseBucketID )
  } fetchData()}, []);

  const bucketData = useSelector((state) => state.modal.bucketData);
  const {usersData} = useSelector((state) => state.modal.usersData);

  const searchCard = () => {
    const titleMatchData = bucketData.filter((card) => card.title.includes(search))
    const tagMatchData = bucketData.filter((card) => card.tag.includes(search))
    const mergeData = [...titleMatchData, ... tagMatchData]
    const set = new Set(mergeData)
    const searchedData = [...set]
    const searchedCards = searchedData.map((card, i) => {
      return <ColumnCard
        key={i}
        cardID={card.id}
        writername={usersData[card.users_id - 1].username}
        title={card.title}
        cardtext={card.cardtext}
        background={card.background}
        createdAt={card.createdAt}
        completed={card.completed}
        tags={card.tag}
        membersID={card.membersID}
        stamped={card.stamped[0]}
      />;
    })
    setCards(searchedCards)
    const w = (searchedCards.length * 220) + 240
  }

  const enterSearchCard = (e) => {
    if(e.key === 'Enter'){
      const titleMatchData = bucketData.filter((card) => card.title.includes(search))
      const tagMatchData = bucketData.filter((card) => card.tag.includes(search))
      const mergeData = [...titleMatchData, ... tagMatchData]
      const set = new Set(mergeData)
      const searchedData = [...set]
      const searchedCards = searchedData.map((card, i) => {
        return <ColumnCard
          key={i}
          cardID={card.id}
          writername={usersData[card.users_id - 1].username}
          title={card.title}
          cardtext={card.cardtext}
          background={card.background}
          createdAt={card.createdAt}
          completed={card.completed}
          tags={card.tag}
          membersID={card.membersID}
          stamped={card.stamped[0]}
        />;
      })
      setCards(searchedCards)
      const w = (searchedCards.length * 220) + 240
    }
  }

  return (
    <>
      <ColumnListWrap>
        <div id={isDesktop ? 'card-list-column' : 'card-list-column-mobile'}>
          <div id={isDesktop ? "columnList" : "columnList-mobile"}>
            <button className={isDesktop ? 'create-card-button' : 'create-card-button-mobile'} onClick={() => { dispatch(openMakeCardModal()) }}>+</button>
            {/* {itemLists.map((item, i) => {
            return <ColumnCard title={item.title} tags={item.tags} writer={item.writer} memberCount={item.memberCount} background={item.background} key={i} />;
          })} */}
            {cards}
          </div>
          <div className={isDesktop ? 'column-search-bar' : 'column-search-bar-mobile'}>
            <input className='column-search-input' type="text" placeholder="제목 및 태그" onChange={(e) => {
            setSearch(e.target.value)
          }} onKeyUp={enterSearchCard}/>
            <img className='column-search-icon' src='/images/search-icon.png'onClick={searchCard} />
          </div>
        </div>
        
      </ColumnListWrap>
    </>
  );
};
