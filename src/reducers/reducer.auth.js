import { setLoginState } from '../actions/actions.auth';
import { createReducer } from '@reduxjs/toolkit';

export default createReducer(
  { isLoggedIn: false },
  {
    [setLoginState]: (state, action) => {
      state.isLoggedIn = action.payload.loginState;
    },
  }
);
