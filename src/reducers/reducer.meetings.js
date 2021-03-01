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
            link: action.payload.link,
            name: action.payload.name,
          },
        ],
      };

    default:
      return state;
  }
};
