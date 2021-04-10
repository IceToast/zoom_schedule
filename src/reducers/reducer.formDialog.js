import {createReducer} from '@reduxjs/toolkit';
import {setFormDialogState} from '../actions/actions.setFormDialogState';

export default createReducer(
  {open: false, onClose: () => {}, mode: 'create', meeting: {}},
  {
    [setFormDialogState]: (state, action) => ({
      ...state,
      ...action.payload.dialogStateData,
    }),
  }
);
