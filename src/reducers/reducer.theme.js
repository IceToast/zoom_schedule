import {createReducer} from '@reduxjs/toolkit';
import {setTheme} from '../actions/actions.setThemestate';

export default createReducer(
  {
    paletteType: localStorage.getItem('themePaletteType') || 'light',
  },
  {
    [setTheme]: (state, action) => {
      state.paletteType = action.payload.themeState;
    },
  }
);
