import {fetchMeetings} from './actions.fetchMeetings';
export const CREATE_MEETING = 'CREATE_MEETING';

export const createMeeting = postData => {
  return {
    type: CREATE_MEETING,
    request: {
      url: '/meeting',
      method: 'POST',
      data: {
        day: postData.day,
        name: postData.name,
        link: postData.link,
        password: postData.password,
      },
    },
    meta: {
      mutations: {
        [fetchMeetings]: (data, mutationData) => {
          const dayIndex = data.findIndex(day => day.name === postData.day);
          const newData = [...data];
          if (newData[dayIndex]) {
            newData[dayIndex].meetings = newData[dayIndex].meetings.concat(
              mutationData
            );
          }
          return newData;
        },
      },
    },
  };
};
