import {createAction} from '@reduxjs/toolkit';

export const setThemeState = createAction('setTheme', setState => ({
  payload: {
    themeState: setState,
  },
}));
