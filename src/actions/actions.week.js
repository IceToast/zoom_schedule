export const ADD_MEETING_TO_DAY = 'ADD_MEETING_TO_DAY';

export const addMeetingToDay = meeting => ({
  type: ADD_MEETING_TO_DAY,
  payload: meeting,
});
