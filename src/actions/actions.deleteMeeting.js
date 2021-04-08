import { LOAD_MEETINGS } from './actions.loadMeetings';
export const DELETE_MEETING = 'DELETE_MEETING';

export const deleteMeeting = (deleteMeeting, day) => {

    return {
        type: DELETE_MEETING,
        request: {
            url: '/meeting',
            method: 'DELETE',
            data: {
                id: deleteMeeting._id,
                day
            },
        },
        meta: {
            mutations: {
                [LOAD_MEETINGS]: data => {
                    const dayIndex = data.findIndex(day => {
                        console.log(`${day.name} ${day}`);
                        return day.name === day;
                    });
                    console.log("dayIndex: " + dayIndex);
                    const newData = [...data]
                    console.log(newData);
                    if(newData[dayIndex]){
                        newData[dayIndex].meetings = newData[dayIndex].meetings.filter(meeting => meeting._id !== deleteMeeting._id)
                        console.log(newData);
                    }
                    return newData;
                }
            }
        }
    }
}
