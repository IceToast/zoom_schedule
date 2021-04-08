import { LOAD_MEETINGS } from './actions.loadMeetings';
export const CREATE_MEETING = 'CREATE_MEETING';

export const createMeeting = (data) => {

    return {
        type: CREATE_MEETING,
        request: {
            url: '/meeting',
            method: 'POST',
            data: {
                day: data.day,
                name: data.name,
                link: data.link,
                password: data.password
            },
        },
        meta: {
            mutations: {
                [LOAD_MEETINGS]: (data, mutationData) => {
                    const dayIndex = data.findIndex(day => day.name === data.day);
                    const newData = [...data]
                    if(newData[dayIndex]){
                        newData[dayIndex].meetings = newData[dayIndex].meetings.concat(mutationData)
                    }
                    return newData;
                }
            }
        }
    }
}
