import { useCallback, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import HorizontalScroll from 'react-scroll-horizontal';
import StampedCard from "./StampedCard";
import Loader from "./Loader";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { setStampedData, setUsersData } from '../redux/reducers/ModalReducer'


const StampedListWrap = styled.div`
  #card-list {
    width: calc(100vw - 240px);
    height: 420px;
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
    height: 420px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .search-bar-mobile {
    align-self: center;
    position: relative;
    top: 0px;
    margin-left: 0px;
    width: 80%;
    min-width: 260px;
    z-index: 1;
  }
  .dummyarea2 {
    height: 100%;
    width: calc(100vw - 240px);
  }
  .card-list-line {
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    ::-webkit-scrollbar {
        display: none;
        }
  }
`;


export default function StampedList () {
  const isDesktop = useMediaQuery({ minWidth: 921 })

  const dispatch = useDispatch();

  const [stamped, setStamped] = useState([]);
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("");

  const dummyarea2 = document.querySelector('.dummyarea2')

  const saveData = (responseAllCards, responseUsers) => {
    const allCardsData = responseAllCards.data;
    const usersData = responseUsers.data;
    const stampedData = allCardsData.filter((card) => card.stamped[0] !== null)

    dispatch(setStampedData({ stampedData }));
    dispatch(setUsersData({ usersData }));

    const reverseStampedData = stampedData.slice().reverse()

    setStamped(
      reverseStampedData.map((card, i) => {
      return <StampedCard
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

  
  const {stampedData} = useSelector((state) => state.modal.stampedData);
  const {usersData} = useSelector((state) => state.modal.usersData);

  const searchCard = () => {
    const titleMatchData = stampedData.filter((card) => card.title.includes(search))
    const tagMatchData = stampedData.filter((card) => card.tag.includes(search))
    const mergeData = [...titleMatchData, ... tagMatchData]
    const set = new Set(mergeData)
    const searchedData = [...set]
    const searchedCards = searchedData.map((card, i) => {
      return <StampedCard
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
    setStamped(searchedCards)
    const w = (searchedCards.length * 220) + 240
    dummyarea2.style.width = `calc(100vw - ${w}px)`
  }

  const enterSearchCard = (e) => {
    if(e.key === 'Enter'){
      const titleMatchData = stampedData.filter((card) => card.title.includes(search))
      const tagMatchData = stampedData.filter((card) => card.tag.includes(search))
      const mergeData = [...titleMatchData, ... tagMatchData]
      const set = new Set(mergeData)
      const searchedData = [...set]
      const searchedCards = searchedData.map((card, i) => {
        return <StampedCard
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
      setStamped(searchedCards)
      const w = (searchedCards.length * 220) + 240
      dummyarea2.style.width = `calc(100vw - ${w}px)`
    }
  }
  

  return (
    <StampedListWrap >
      <div id={isDesktop ? 'card-list' : 'card-list-mobile'} >
        {/* <HorizontalScroll
          className='horizontalScroll'
          pageLock={false}
          reverseScroll={true}
          style={{ height: "100%", width: "100%" }}
        >
          <div className="dummy" />
          {stamped}
          <div className="dummy" />
          <div className="dummyarea2"/>
        </HorizontalScroll> */}
        <div className="card-list-line">
        {stamped}
        </div>
        <div className={isDesktop? 'search-bar' : 'search-bar-mobile'}>
          <input className='search-input' type="text" placeholder="제목 및 태그" onChange={(e) => {
            setSearch(e.target.value)
          }} onKeyUp={enterSearchCard}/>
          <img className='search-icon' src='/images/search-icon.png' onClick={searchCard}/>
        </div>
      </div>
    </StampedListWrap>
  );
};

