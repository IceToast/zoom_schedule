import {createReducer} from '@reduxjs/toolkit';
import {SET_FORM_DIALOG_STATE} from '../actions/actions.setFormDialogState';

export default createReducer(
  {open: false, onClose: () => {}, mode: 'create', meeting: {}},
  {
    [SET_FORM_DIALOG_STATE]: (state, action) => {
      state = {
        ...state,
        open: action.open,
        onClose: action.onClose,
        mode: action.mode,
        meeting: action.meeting,
      };
    },
  }
);
