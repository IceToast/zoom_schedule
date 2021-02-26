import {combineReducers} from 'redux';
import {addSubjectReducer} from './reducer.meetings';
import {weekDaysReducer} from './reducer.weekDays';

export default combineReducers({
  weekDays: weekDaysReducer,
  meetings: addSubjectReducer,
});
