import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Input,
  makeStyles,
  Snackbar,
  Switch,
} from '@material-ui/core';
import { generateJSONFile } from '../util/json';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { createMeeting, flushSchedule } from '../actions/actions.meeting';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1.5),
  },
  button: {
    margin: theme.spacing(0, 1),
  },
  checkbox: {
    margin: theme.spacing(0, 1),
  },
  input: {
    display: 'none',
  },
}));

const ImportExport = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [snackbarState, setSnackbarState] = useState(false);

  const exportFileNameInput = useRef();
  const importFileInput = useRef();
  const overwriteCheckbox = useRef();

  const days = useSelector(state => state.meetings.days);

  const exportMeetings = () => {
    const fileName = exportFileNameInput.current.value;
    generateJSONFile(days, fileName);
  };

  const importMeetings = () => {
    const jsonDataFile = importFileInput.current.files[0];
    const overWriteCheckboxChecked = overwriteCheckbox.current.checked;
    if (!jsonDataFile) {
      return setSnackbarState({ open: true, message: 'Please select JSON file for import' });
    }

    const reader = new FileReader();
    reader.addEventListener('load', async () => {
      const data = JSON.parse(reader.result);

      if (overWriteCheckboxChecked) {
        await dispatch(flushSchedule());
      }

      // Add Meetings
      data.forEach(day => {
        if (day.meetings) {
          day.meetings.forEach(meeting => {
            dispatch(
              createMeeting({
                day: day.name,
                name: meeting.name,
                link: meeting.link,
                password: meeting.password,
              })
            );
          });
        }
        // Support Zoom-Calendar json
        if (day.subjects) {
          day.subjects.forEach(meeting => {
            dispatch(
              createMeeting({
                day: day.name,
                name: meeting.name,
                link: meeting.link,
                password: meeting.pass,
              })
            );
          });
        }
      });
    });

    reader.readAsText(jsonDataFile, 'UTF-8');
  };

  const closeErrorSnackbar = () => {
    setSnackbarState({ open: false, message: '' });
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="false">
        <DialogTitle>Import/Export Meetings</DialogTitle>

        <DialogContent>
          <div className={classes.row}>
            <Input inputRef={exportFileNameInput} defaultValue="meetings.json" variant="outlined" className={classes.left} />
            <Button onClick={exportMeetings} className={classes.button} variant="contained" color="primary">
              Export Meetings
            </Button>
          </div>
          <div className={classes.row}>
            <label htmlFor="contained-button-file">
              <Input
                className={classes.input}
                inputRef={importFileInput}
                id="contained-button-file"
                type="file"
                accept="application/JSON"
              />
              <Button variant="contained" component="span">
                Choose File...
              </Button>
            </label>
            <FormControlLabel
              className={classes.checkbox}
              control={<Switch color="primary" inputRef={overwriteCheckbox} />}
              label="Overwrite"
            />
            <Button onClick={importMeetings} className={classes.button} variant="contained" color="primary">
              Import Meetings
            </Button>
          </div>
        </DialogContent>
        <Snackbar open={snackbarState.open} autoHideDuration={3000} onClose={closeErrorSnackbar}>
          <Alert onClose={closeErrorSnackbar} severity="error">
            {snackbarState.message}
          </Alert>
        </Snackbar>
      </Dialog>
    </>
  );
};

export default ImportExport;
