export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';

export const setLoggedInState = (isLoggedIn) => ({
    type: SET_LOGIN_STATE,
    isLoggedIn
})
