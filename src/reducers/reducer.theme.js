import {createReducer} from '@reduxjs/toolkit';
import {SET_THEME_STATE} from '../actions/actions.setThemestate';

export default createReducer(
  {
    paletteType: localStorage.getItem('themePaletteType') || 'light',
  },
  {
    [SET_THEME_STATE]: (state, action) => {
      state.paletteType = action.paletteType;
    },
  }
);
