import { createReducer } from '@reduxjs/toolkit';
import { success } from '@redux-requests/core';
import { fetchMeetings, createMeeting, editMeeting, deleteMeeting, flushSchedule } from '../actions/actions.meeting';

const initalDaysState = [
  { name: 'Monday', meetings: [] },
  { name: 'Tuesday', meetings: [] },
  { name: 'Wednesday', meetings: [] },
  { name: 'Thursday', meetings: [] },
  { name: 'Friday', meetings: [] },
  { name: 'Saturday', meetings: [] },
];

export default createReducer(
  {
    days: initalDaysState,
  },
  {
    [success(fetchMeetings)]: (state, action) => {
      state.days = action.payload.data;
    },
    [success(createMeeting)]: (state, action) => {
      const dayIndex = state.days.findIndex(day => day.name === action.meta.requestAction.payload.request.data.day);
      state.days[dayIndex].meetings = state.days[dayIndex].meetings.concat(action.payload.data);
    },
    [success(editMeeting)]: (state, action) => {
      const dayIndex = state.days.findIndex(day => day.name === action.meta.requestAction.payload.request.data.day);
      const meetingIndex = state.days[dayIndex].meetings.findIndex(meeting => meeting._id === action.payload.data._id);
      state.days[dayIndex].meetings[meetingIndex] = action.payload.data;
    },
    [success(deleteMeeting)]: (state, action) => {
      const dayIndex = state.days.findIndex(day => day.name === action.meta.requestAction.payload.request.data.day);
      state.days[dayIndex].meetings = state.days[dayIndex].meetings.filter(
        meeting => meeting._id !== action.meta.requestAction.payload.request.data.id
      );
    },
    [success(flushSchedule)]: (state, action) => {
      state.days = initalDaysState;
    },
  }
);
