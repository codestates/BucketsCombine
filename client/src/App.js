import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, Redirect, Router, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import OAuthSignUpPage from './pages/OAuthSignUpPage';
import RowList from './components/RowList'
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './components/Modal'
import axios from 'axios';
import './App.css';

const App = () => {
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {isOpen && <Modal />}
            <MainPage />
          </Route>
          <Route exact path='/signin'>
            <SignInPage />
          </Route>
          <Route exact path='/signup'>
            <OAuthSignUpPage />
          </Route>
          <Route exact path='/signupoauth'>
            <SignUpPage />
          </Route>
          <Route exact path='/mypage'>
            {isOpen && <Modal />}
            <MyPage />
          </Route>
          <Route exact path='/test'>
            <RowList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;