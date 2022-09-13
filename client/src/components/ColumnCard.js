import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { openMyCardModal, openMyStampedModal, setModalCardID } from "../redux/reducers/ModalReducer";

const ColumnCardWrap = styled.div`
  .ColumnCard {
    display: flex;
    flex-direction: row;
    color: white;
    width: 100%;
  }

  .ColumnCard-progress-0 {
    background-color: #8A8A8A;
    height: 80px;
    width: 10px;
    border-radius: 10px;
    margin: 5px;
  }

  .ColumnCard-progress-1 {
    background-color: #FFC700;
    height: 80px;
    width: 10px;
    border-radius: 10px;
    margin: 5px;
  }

  .ColumnCard-progress-2 {
    background-color: #FF5C00;
    height: 80px;
    width: 10px;
    border-radius: 10px;
    margin: 5px;
  }

  .ColumnCard-progress-stamped {
    background-color: transparent;
    height: 80px;
    width: 10px;
    border-radius: 10px;
    margin: 5px;
  }

  .ColumnCard-info {
    width: calc(70vw - 60px);
    max-width: 940px;
    height: 60px;
    border-radius: 15px;
    background-position: center center;
    background-size: cover;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    :hover{
      box-shadow:  3px 3px 6px rgba(0,0,0,0.4);
      transition: box-shadow 0.2s;
    }
  }

  .ColumnCard-info-text {
    margin-left: 10px;
    width: 40vw;
    text-align: start;
    flex-grow: 1;
  }

  .ColumnCard-title {
    font-size: 24px;
    overflow-x: auto;
  }

  .ColumnCard-writer {
    width: 100px;
  }

  .ColumnCard-share-icon {
    width: 30px;
    top: 10px;
    right: 0px;
    margin: 10px;
  }

  .ColumnCard-member-count {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    font-size: 1em;
    color: black;
    background-color: white;
    font-display: flex;
    text-align: center;
    line-height: 60px;
  }

  .ColumnCard-tag {
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
    ::-webkit-scrollbar {
        display: none;
        }
  }

  .ColumnCard-info-mobile {
    width: calc(95vw - 60px);
    height: 60px;
    border-radius: 15px;
    background-size: cover;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-position: center center;
  }

  .ColumnCard-title-mobile {
    font-size: 18px;
    font-weight: bold;
    overflow-x: auto;
    white-space: nowrap;
    ::-webkit-scrollbar {
        display: none;
        }
  }
`;

export default function ColumnCard ({
  cardID,
  writername,
  title,
  cardtext,
  background,
  createdAt,
  completed,
  tags,
  membersID,
  stamped,
}) {
  const isDesktop = useMediaQuery({ minWidth: 921 })

  const tagLine = tags.map(tag => {
      return `#${tag}`
  })
 
  let backgroundImageStyle = Boolean(stamped)? 
  {
    backgroundImage: "url(" + background + ")",
  } : 
  {
    backgroundImage: "url(/images/card-" + background + ".jpg)",
  };


 const dispatch = useDispatch();

 const isStamped = stamped !== null
  
  return (
    <ColumnCardWrap>
      <div 
        className="ColumnCard"
        onClick={() => {
          dispatch(openMyCardModal());
          dispatch(setModalCardID(cardID));
        }}
        >
        {isStamped? <div className="ColumnCard-progress-stamped"/> : 
        <div className={
          completed==='0'? 'ColumnCard-progress-0'
          : completed==='1'? 'ColumnCard-progress-1'
          : 'ColumnCard-progress-2'
        }/>
        }
        
        <div className={isDesktop?'ColumnCard-info' : 'ColumnCard-info-mobile' }style={backgroundImageStyle} >
        <div className='ColumnCard-info-text'>
            <div className={isDesktop? "ColumnCard-title" : "ColumnCard-title-mobile"}>{title}</div>
            <div className="ColumnCard-tag">{tagLine.join(' ')}</div>
        </div>
        <div className="ColumnCard-writer">{writername}</div>
        <div className='ColumnCard-member-count'>
        {membersID.length}명
        </div>
        </div>
      </div>
    </ColumnCardWrap>
  );
};