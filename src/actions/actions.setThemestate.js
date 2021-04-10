import {createAction} from '@reduxjs/toolkit';

export const setTheme = createAction('setTheme', setState => ({
  payload: {
    themeState: setState,
  },
}));
