import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, Redirect, Router, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import OAuthSignUpPage from './pages/OAuthSignUpPage';
import { useDispatch, useSelector } from 'react-redux';
import MainPageCardModal from './components/modals/MainPageCardModal'
import './App.css';
import MakeCardModal from './components/modals/MakeCardModal';
import MainPageStampedCardModal from './components/modals/MainPageStampedModal';
import MyPageMyCardModal from './components/modals/MyCardModal'
import ConfirmChangeModal from './components/modals/ConfirmChangeModal'
import ChangePasswordCardModal from './components/modals/ChangePasswordModal';
import WithdrawalCardModal from './components/modals/WithdrawalModal';
import UserInfoModal from './components/modals/UserInfoModal'
import ConfirmWithdrawal from './components/modals/ConfrimWithdrawal'
import EditCardModal from './components/modals/EditCardModal'
import axios from 'axios';


const App = () => {
  const { isOpenCard } = useSelector((store) => store.modal);
  const { isOpenStamped } = useSelector((store) => store.modal);
  const { isOpenMakeCard } = useSelector((store) => store.modal);
  const { isOpenMyCard } = useSelector((store) => store.modal);
  const { isOpenMyStamped } = useSelector((store) => store.modal);
  const { isOpenChangePassword } = useSelector((store) => store.modal);
  const { isOpenConfirmChange } = useSelector((store) => store.modal);
  const { isOpenWithdrawal } = useSelector((store) => store.modal);
  const { isOpenUserInfo } = useSelector((store) => store.modal);
  const { isOpenEditCardModal } = useSelector((store) => store.modal);
  const { isOpenConfirmWithdrawal } = useSelector((store) => store.modal);


  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <MainPage />
            {isOpenCard && <MainPageCardModal />}
            {isOpenStamped && <MainPageStampedCardModal />}
          </Route>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
          <Route exact path="/signupoauth">
            <OAuthSignUpPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path='/mypage'>
            {isOpenMakeCard && <MakeCardModal/>}
            {isOpenMyCard && <MyPageMyCardModal/>}
            {isOpenChangePassword && <ChangePasswordCardModal/>}
            {isOpenConfirmChange && <ConfirmChangeModal/>}
            {isOpenConfirmWithdrawal && <ConfirmWithdrawal/>}
            {isOpenWithdrawal && <WithdrawalCardModal/>}
            {isOpenUserInfo && <UserInfoModal />}
            {isOpenEditCardModal && <EditCardModal/>}
            <MyPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

