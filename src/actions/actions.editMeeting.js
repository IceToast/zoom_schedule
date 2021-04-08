import { LOAD_MEETINGS } from './actions.loadMeetings';
export const EDIT_MEETING = 'EDIT_MEETING';

export const editMeeting = (putData) => {

    return {
        type: EDIT_MEETING,
        request: {
            url: '/meeting',
            method: 'PUT',
            data: {
                id: putData._id,
                day: putData.day,
                name: putData.name,
                link: putData.link,
                password: putData.password
            },
        },
        meta: {
            mutations: {
                [LOAD_MEETINGS]: (data) => {
                    const dayIndex = data.findIndex(day => day.name === putData.day);
                    const newData = [...data]
                    if(newData[dayIndex]){
                        const meetingIndex = newData[dayIndex].meetings.findIndex(meeting => meeting._id === putData._id);
                        newData[dayIndex].meetings[meetingIndex] = putData;
                    }
                    return newData;
                }
            }
        }
    }
}
