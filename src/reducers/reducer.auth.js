import {setLoginState} from '../actions/actions.setLoggedInState';
import {createReducer} from '@reduxjs/toolkit';

export default createReducer(
  {isLoggedIn: true},
  {
    [setLoginState]: (state, action) => {
      state.isLoggedIn = action.isLoggedIn;
    },
  }
);
