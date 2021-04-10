import { SET_THEME_STATE } from '../actions/actions.setThemestate';

const initialState = {
    paletteType: localStorage.getItem('themePaletteType') || 'light'
}

export function themeReducer(state = initialState, action){
    switch(action.type){
        case SET_THEME_STATE:
            return {
                ...state,
                paletteType: action.paletteType
            }
        default:
            return state
    }
}