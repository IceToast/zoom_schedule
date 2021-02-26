import {SET_SHORTWEEK, SET_LONGWEEK} from '../actions/actions.weekDays';

const weekDays = {
  shortWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  longWeek: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
};

export const weekDaysReducer = (
  state = {weekDays: weekDays.shortWeek},
  action
) => {
  switch (action.type) {
    case SET_LONGWEEK:
      return {...state, weekDays: weekDays.longWeek};
    case SET_SHORTWEEK:
      return {...state, weekDays: weekDays.shortWeek};
    default:
      return state;
  }
};
