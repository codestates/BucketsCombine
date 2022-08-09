import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    isOpenCard: false,
    isOpenStamped: false,
    isOpenMakeCard: false,
    isOpenMyCard: false,
    isOpenMyStamped: false,
    isOpenChangePassword: false,
    isOpenConfirmChange: false,
    isOpenWithdrawal: false,
    isOpenUserInfo: false,
    isOpenConfirmWithdrawal: false,
    mode:"",
    cardsData: [],
    modalCardID: 0,
    usersData: [],
    bucketData: [],
    allCardsData: [],
    stampedData: [],
    isInBucketModal: false,
    modalUserID: 0,
    isOpenEditCardModal: false,
    selectUserID : 0,
    userinfo: [],
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCardModal: (state, action) => {
            state.isOpenCard = true;
        },
        openStampedModal: (state, action) => {
            state.isOpenStamped = true;
        },
        openMakeCardModal: (state, action) => {
            state.isOpenMakeCard = true;
        },
        openMyCardModal: (state, action) => {
            state.isOpenMyCard = true;
        },
        openMyStampedModal: (state, action) => {
            state.isOpenMyStamped = true;
        },
        openChangePasswordModal: (state, action) => {
            state.isOpenChangePassword = true;
        },
        openConfirmChangeModal: (state, action) => {
            state.isOpenConfirmChange = true;
        },
        openWithdrawalModal: (state, action) => {
            state.isOpenWithdrawal = true;
        },
        openUserInfoModal: (state, action) => {
            state.isOpenUserInfo = true;
        },
        openConfirmWithdrawal: (state, action) => {
            state.isOpenConfirmWithdrawal = true;
        },
        closeMainPageCardModal: (state, action) => {
            state.isOpenCard = false;
        },
        closeMainStampedCardModal: (state, action) => {
            state.isOpenStamped = false;
        },
        closeMakeCardModal: (state, action) => {
            state.isOpenMakeCard = false;
        },
        closeMyCardModal: (state, action) => {
            state.isOpenMyCard = false;
        },
        closeMyStampedModal: (state, action) => {
            state.isOpenMyStamped = false;
        },
        closeChangePasswordModal: (state, action) => {
            state.isOpenChangePassword = false;
        },
        closeConfirmChangeModal: (state, action) => {
            state.isOpenConfirmChange = false;
        },
        closeWithdrawalModal: (state, action) => {
            state.isOpenWithdrawal = false;
        },
        closeUserInfoModal: (state, action) => {
            state.isOpenUserInfo = false;
        },
        closeConfirmWithdrawal: (state, action) => {
            state.isOpenConfirmWithdrawal = false;
        },
        setCardsData: (state, action) => {
            state.cardsData = action.payload;
        },
        setModalCardID: (state, action) => {
            state.modalCardID = action.payload;
        },
        setUsersData: (state, action) => {
            state.usersData = action.payload;
        },
        setBucketData: (state, action) => {
            state.bucketData = action.payload;
        },
        setAllcardsData: (state, action) => {
            state.allCardsData = action.payload;
        },
        setStampedData: (state, action) => {
            state.stampedData = action.payload;
        },
        setIsInBucketModal: (state, action) => {
            state.isInBucketModal = action.payload;
        },
        setModalUserID: (state, action) => {
            state.modalUserID = action.payload;
        },
        openEditCardModal: (state, action) => {
            state.isOpenEditCardModal = true;
        },
        closeEditCardModal: (state, action) => {
            state.isOpenEditCardModal = false;
        },
        setSelectUserID: (state, action) => {
            state.selectUserID = action.payload;
        },
        
    }
});
export const { 
    openCardModal, 
    openStampedModal,
    openMakeCardModal,
    openMyCardModal,
    openMyStampedModal,
    openChangePasswordModal,
    openConfirmChangeModal,
    openWithdrawalModal,
    openUserInfoModal,
    openConfirmWithdrawal,
    closeMainPageCardModal,
    closeMainStampedCardModal,
    closeMakeCardModal,
    closeMyCardModal,
    closeMyStampedModal,
    closeChangePasswordModal,
    closeConfirmChangeModal,
    closeWithdrawalModal,
    closeUserInfoModal,
    closeConfirmWithdrawal,
    setCardsData,
    setModalCardID,
    setUsersData,
    setBucketData,
    setAllcardsData,
    setStampedData,
    setIsInBucketModal,
    setModalUserID,
    openEditCardModal,
    closeEditCardModal,
    setSelectUserID,
    } = modalSlice.actions;
export default modalSlice.reducer;