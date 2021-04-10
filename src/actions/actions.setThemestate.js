export const SET_THEME_STATE = 'SET_THEME_STATE';

export const setThemeState = (payload) => {
    payload.type = SET_THEME_STATE;
    return payload;
}
