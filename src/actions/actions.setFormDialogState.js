import {createAction} from '@reduxjs/toolkit';

export const setFormDialogState = createAction(
  'setFormDialogState',
  dialogStateData => ({
    payload: {
      dialogStateData,
    },
  })
);
