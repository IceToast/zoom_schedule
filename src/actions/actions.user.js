import { createAction } from '@reduxjs/toolkit';

export const setLoginState = createAction('setLoginState', loggedIn => ({
  payload: {
    loginState: loggedIn,
  },
}));

export const getUserData = createAction('getUserData', _ => ({
  payload: {
    request: {
      url: '/user',
      method: 'GET',
    },
  },
}));
