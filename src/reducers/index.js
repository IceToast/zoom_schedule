import {combineReducers} from 'redux';
import {addSubjectReducer} from './reducer.meetings';
import {weekReducer} from './reducer.week';

export default combineReducers({
  week: weekReducer,
  meetings: addSubjectReducer,
});
