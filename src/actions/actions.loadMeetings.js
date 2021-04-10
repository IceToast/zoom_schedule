import {createAction} from '@reduxjs/toolkit';

export const fetchMeetings = createAction('fetchMeetings', _ => ({
  payload: {
    request: {url: '/meeting', method: 'GET'},
  },
}));
