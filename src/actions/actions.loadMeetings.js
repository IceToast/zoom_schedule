export const LOAD_MEETINGS = 'LOAD_MEETINGS';

export const loadMeetings = () => ({
    type: LOAD_MEETINGS,
    request: {
      url: '/meeting',
      method: 'GET'
    }
})
