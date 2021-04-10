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
      console.log(action);
      console.log(dayIndex);
      console.log(state.days[dayIndex].meetings);

      //ERROR wenn meetings undefined!
      state.days[dayIndex].meetings = state.days[dayIndex].meetings.concat(action.payload.data);
    },
    [success(editMeeting)]: (state, action) => {
      const dayIndex = state.days.findIndex(day => day.name === action.meta.requestAction.payload.request.data.day);
      if (state.days[dayIndex]) {
        const meetingIndex = state.days[dayIndex].meetings.findIndex(meeting => meeting._id === action.payload.data._id);
        state.days[dayIndex].meetings[meetingIndex] = action.payload.data;
      }
    },
    [success(deleteMeeting)]: (state, action) => {
      const dayIndex = state.days.findIndex(day => day.name === action.payload.data.day);
      if (state.days[dayIndex]) {
        state.days[dayIndex].meetings = state.days[dayIndex].meetings.filter(meeting => meeting._id !== deleteMeeting._id);
      }
    },
  }
);
