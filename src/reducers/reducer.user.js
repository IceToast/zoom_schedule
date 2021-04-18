import { setLoginState, getUserData, getUserAgent } from '../actions/actions.user';
import { createReducer } from '@reduxjs/toolkit';
import { success } from '@redux-requests/core';

export default createReducer(
  { isLoggedIn: false },
  {
    [setLoginState]: (state, action) => {
      state.isLoggedIn = action.payload.loginState;
    },
    [success(getUserData)]: (state, action) => {
      state.userData = action.payload.data;
    },
    [getUserAgent]: (state, action) => {
      state.userAgent = action.payload.userAgent;
    },
  }
);
