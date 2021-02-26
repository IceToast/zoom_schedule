import {ADD_MEETING} from '../actions/actions.meetings';

export const addSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MEETING:
      return [...state, action.payload];
    default:
      return state;
  }
};
