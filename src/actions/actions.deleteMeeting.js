import {fetchMeetings} from './actions.loadMeetings';
export const DELETE_MEETING = 'DELETE_MEETING';

export const deleteMeeting = (deleteMeeting, deleteDay) => {
  return {
    type: DELETE_MEETING,
    request: {
      url: '/meeting',
      method: 'DELETE',
      data: {
        id: deleteMeeting._id,
        day: deleteDay,
      },
    },
    meta: {
      mutations: {
        [fetchMeetings]: data => {
          const dayIndex = data.findIndex(day => day.name === deleteDay);
          const newData = [...data];
          if (newData[dayIndex]) {
            newData[dayIndex].meetings = newData[dayIndex].meetings.filter(
              meeting => meeting._id !== deleteMeeting._id
            );
          }
          return newData;
        },
      },
    },
  };
};
