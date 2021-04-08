import { SET_FORM_DIALOG_STATE } from '../actions/actions.setFormDialogState';

const initialState = {
    open: false,
    onClose: () => {},
    mode: 'create',
    meeting: {}
}

export function formDialogReducer(state = initialState, action){
    switch(action.type){
        case SET_FORM_DIALOG_STATE:
            return {
                ...state,
                open: action.open,
                onClose: action.onClose,
                mode: action.mode,
                meeting: action.meeting
            }
        default:
            return state
    }
}