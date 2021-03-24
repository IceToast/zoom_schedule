import {ADD_MEETING} from '../actions/actions.meetings';

export const addSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MEETING:
      return {
        ...state,
        meetingRooms: [
          ...state.meetingRooms,
          {
            id: action.payload.id,
            name: action.payload.name,
            link: action.payload.link,
            password: action.payload.password,
          },
        ],
      };

    default:
      return state;
  }
};
