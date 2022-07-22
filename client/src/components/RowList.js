import { useCallback, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import HorizontalScroll from 'react-scroll-horizontal';
import RowCard from "./RowCard";
import Loader from "./Loader";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { setCardsData, setAllcardsData, setUsersData } from '../redux/reducers/ModalReducer'


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
    width: 400px;
    z-index: 1;
  }
  .dummyarea {
    height: 100%;
    width: calc(0vw - 240px);
  }
`;


export default function RowList () {
  const isDesktop = useMediaQuery({ minWidth: 921 })

  const dispatch = useDispatch();

  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("");

  const dummyarea = document.querySelector('.dummyarea')

  const saveData = (responseAllCards, responseUsers) => {
    const allCardsData = responseAllCards.data;
    const usersData = responseUsers.data;
    const cardsData = allCardsData.filter((card) => card.stamped[0] === null)
    dispatch(setCardsData({ cardsData }));
    dispatch(setAllcardsData({ allCardsData }));
    dispatch(setUsersData({ usersData }));
    setCards(
      cardsData.map((card, i) => {
      return <RowCard
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
      />;
    }))
    setUsers(usersData)
  }

  useEffect(() => {async function fetchData() {
    const responseAllCards = await axios.get(`${process.env.REACT_APP_API_URL}/mainpage/cardinfo`)
    const responseUsers = await axios.get(`${process.env.REACT_APP_API_URL}/mypage/usersinfo`)
    const sendData = await saveData(responseAllCards,responseUsers )
  } fetchData()}, []);

  
  const {cardsData} = useSelector((state) => state.modal.cardsData);
  const {usersData} = useSelector((state) => state.modal.usersData);

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
        title={card.title}
        cardtext={card.cardtext}
        background={card.background}
        createdAt={card.createdAt}
        completed={card.completed}
        tags={card.tag}
        membersID={card.membersID}
      />;
    })
    setCards(searchedCards)
    const w = (searchedCards.length * 220) + 240
    dummyarea.style.width = `calc(100vw - ${w}px)`
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
          title={card.title}
          cardtext={card.cardtext}
          background={card.background}
          createdAt={card.createdAt}
          completed={card.completed}
          tags={card.tag}
          membersID={card.membersID}
        />;
      })
      setCards(searchedCards)
      const w = (searchedCards.length * 220) + 240
      dummyarea.style.width = `calc(100vw - ${w}px)`
    }
  }
  

  return (
    <RowListWrap >
      <div id={isDesktop ? 'card-list' : 'card-list-mobile'} >
        <HorizontalScroll
          className='horizontalScroll'
          pageLock={false}
          reverseScroll={true}
          style={{ height: "100%", width: "100%" }}
        >
          <div className="dummy" />
          {cards}
          <div className="dummy" />
          <div className="dummyarea"/>
        </HorizontalScroll>
        <div className={isDesktop? 'search-bar' : 'search-bar-mobile'}>
          <input className='search-input' type="text" placeholder="제목 및 태그" onChange={(e) => {
            setSearch(e.target.value)
          }} onKeyUp={enterSearchCard}/>
          <img className='search-icon' src='/images/search-icon.png' onClick={searchCard}/>
        </div>
      </div>
    </RowListWrap>
  );
};
