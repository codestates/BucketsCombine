import { configureStore } from '@reduxjs/toolkit'
import modalReducer from'./reducers/ModalReducer.js';

 export const store = configureStore({
    reducer: {
        modal: modalReducer,
    },
});
