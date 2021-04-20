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
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { flushSchedule } from '../actions/actions.meeting';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',

    '&:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  },
  left: {
    flex: 1,
  },
  button: {
    margin: theme.spacing(0, 1),
  },
  checkbox: {
    margin: theme.spacing(0, 1),
  },
}));

const Settings = props => {
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
      /* if (overWriteCheckboxChecked) {
        await dispatch(flushSchedule());
      } */

      // Add Meetings
      // await dispatch(addMeetings())

      console.log(JSON.parse(reader.result));
    });

    reader.readAsText(jsonDataFile);
  };

  const closeErrorSnackbar = () => {
    setSnackbarState({ open: false, message: '' });
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="xs">
        <DialogTitle>Settings</DialogTitle>

        <DialogContent>
          <div className={classes.row}>
            <Input inputRef={exportFileNameInput} defaultValue="meetings.json" variant="outlined" className={classes.left} />
            <Button onClick={exportMeetings} className={classes.button} variant="contained" color="primary">
              Export Meetings
            </Button>
          </div>
          <div className={classes.row}>
            <Input
              inputRef={importFileInput}
              type="file"
              className={classes.left}
              inputProps={{ accept: 'application/JSON' }}
            />
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

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Settings;
