export const ADD_MEETING = 'ADD_MEETING';

export const addMeeting = meeting => ({
  type: ADD_MEETING,
  payload: meeting,
});
