import {createAction} from '@reduxjs/toolkit';

export const fetchMeetings = createAction('fetchMeetings', _ => ({
  payload: {
    request: {url: '/meeting', method: 'GET'},
  },
}));

//      mutations: {
//        [fetchMeetings]: (data, mutationData) => {
//          const dayIndex = data.findIndex(day => day.name === postData.day);
//          const newData = [...data];
//          if (newData[dayIndex]) {
//            newData[dayIndex].meetings = newData[dayIndex].meetings.concat(
//              mutationData
//            );
//          }
//          return newData;

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

//      mutations: {
//        [fetchMeetings]: data => {
//          const dayIndex = data.findIndex(day => day.name === deleteDay);
//          const newData = [...data];
//          if (newData[dayIndex]) {
//            newData[dayIndex].meetings = newData[dayIndex].meetings.filter(meeting => meeting._id !== deleteMeeting._id);
//          }
//          return newData;

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

//      mutations: {
//        [fetchMeetings]: data => {
//          const dayIndex = data.findIndex(day => day.name === putData.day);
//          const newData = [...data];
//          if (newData[dayIndex]) {
//            const meetingIndex = newData[dayIndex].meetings.findIndex(meeting => meeting._id === putData._id);
//            newData[dayIndex].meetings[meetingIndex] = putData;
//          }
//          return newData;

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
