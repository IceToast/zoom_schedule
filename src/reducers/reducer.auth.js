import {SET_LOGIN_STATE} from '../actions/actions.setLoggedInState';
import {createReducer} from '@reduxjs/toolkit';

export default createReducer(
  {isLoggedIn: true},
  {
    [SET_LOGIN_STATE]: (state, action) => {
      state.isLoggedIn = action.isLoggedIn;
    },
  }
);
