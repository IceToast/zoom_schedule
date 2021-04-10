import { createAction } from '@reduxjs/toolkit';

export const fetchMeetings = createAction('fetchMeetings', _ => ({
  payload: {
    request: { url: '/meeting', method: 'GET' },
  },
}));

export const createMeeting = createAction('createMeeting', meetingData => ({
  payload: {
    request: {
      url: '/meeting',
      method: 'POST',
      data: {
        day: meetingData.day,
        name: meetingData.name,
        link: meetingData.link,
        password: meetingData.password,
      },
    },
  },
}));

export const deleteMeeting = createAction('deleteMeeting', (deleteMeeting, deleteDay) => ({
  payload: {
    request: {
      url: '/meeting',
      method: 'DELETE',
      data: {
        id: deleteMeeting._id,
        day: deleteDay,
      },
    },
  },
}));

export const editMeeting = createAction('editMeeting', meetingData => ({
  payload: {
    request: {
      url: '/meeting',
      method: 'PUT',
      data: {
        id: meetingData._id,
        day: meetingData.day,
        name: meetingData.name,
        link: meetingData.link,
        password: meetingData.password,
      },
    },
  },
}));
