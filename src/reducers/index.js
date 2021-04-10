import themeReducer from './reducer.theme';
import authReducer from './reducer.auth';
import formDialogReducer from './reducer.formDialog';
import meetingReducer from './reducer.meeting';

const reducers = {
  theme: themeReducer,
  auth: authReducer,
  formDialog: formDialogReducer,
  meetings: meetingReducer,
};

export default reducers;
