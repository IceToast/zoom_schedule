import {createAction} from '@reduxjs/toolkit';

export const setLoginState = createAction('setLoginState', loggedIn => ({
  payload: {
    loginState: loggedIn,
  },
}));
