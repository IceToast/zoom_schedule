import {setLoginState} from '../actions/actions.setLoginState';
import {createReducer} from '@reduxjs/toolkit';

export default createReducer(
  {isLoggedIn: false},
  {
    [setLoginState]: (state, action) => {
      state.isLoggedIn = action.isLoggedIn;
    },
  }
);
