export const SET_FORM_DIALOG_STATE = 'SET_FORM_DIALOG_STATE';

export const setFormDialogState = (stateData) => ({
    type: SET_FORM_DIALOG_STATE,
    open: stateData.open,
    onClose: stateData.onClose,
    mode: stateData.mode,
    meeting: stateData.meeting
})
