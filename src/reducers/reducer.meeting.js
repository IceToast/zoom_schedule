import { createReducer } from '@reduxjs/toolkit';
import { success } from '@redux-requests/core';
import { fetchMeetings, createMeeting, editMeeting, deleteMeeting } from '../actions/actions.meeting';

export default createReducer(
  { days: {} },
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
  }
);
