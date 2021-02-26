import {combineReducers} from 'redux';

import {weekDaysReducer} from './reducer.weekDays';

export default combineReducers({
  weekDays: weekDaysReducer,
});
