import { createReducer } from '@reduxjs/toolkit';
import { setThemeState } from '../actions/actions.setThemeState';

export default createReducer(
  {
    paletteType: localStorage.getItem('themePaletteType') || 'dark',
  },
  {
    [setThemeState]: (state, action) => {
      state.paletteType = action.payload.themeState;
    },
  }
);
