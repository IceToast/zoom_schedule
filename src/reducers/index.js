import themeReducer from './reducer.theme';
import userReducer from './reducer.user';
import formDialogReducer from './reducer.formDialog';
import meetingReducer from './reducer.meeting';

const reducers = {
  theme: themeReducer,
  user: userReducer,
  formDialog: formDialogReducer,
  meetings: meetingReducer,
};

export default reducers;
