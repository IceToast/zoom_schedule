import { SET_LOGIN_STATE } from '../actions/actions.setLoggedInState';

const initialState = {
    isLoggedIn: true
}

export function authReducer(state = initialState, action){
    switch(action.type){
        case SET_LOGIN_STATE:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}