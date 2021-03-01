import {ADD_MEETING_TO_DAY} from '../actions/actions.week';

export const weekReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MEETING_TO_DAY:
      return {
        ...state,
        days: [
          ...state.days,
          state.days.map(day => {
            if (day.name === action.payload.day) {
              day.meetings.push({
                id: action.payload.id,
                order: action.payload.order,
              });
            }
            return day;
          }),
        ],
      };
    default:
      return state;
  }
};
