import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { createMeeting, editMeeting } from '../actions/actions.meeting';
import { setFormDialogState } from '../actions/actions.setFormDialogState';

function FormDialog() {
  const formDialogState = useSelector(state => state.formDialog);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const idInputRef = useRef();
  const dayInputRef = useRef();
  const nameInputRef = useRef();
  const linkInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    let action = null;
    if (formDialogState.mode === 'create') {
      action = createMeeting({
        day: dayInputRef.current.value,
        name: nameInputRef.current.value,
        link: linkInputRef.current.value,
        password: passwordInputRef.current.value,
      });
    }

    if (formDialogState.mode === 'edit') {
      action = editMeeting({
        _id: idInputRef.current.value,
        day: dayInputRef.current.value,
        name: nameInputRef.current.value,
        link: linkInputRef.current.value,
        password: passwordInputRef.current.value,
      });
    }

    const { error } = await dispatch(action);

    if (error) {
      setError(true);
    } else {
      dispatch(
        setFormDialogState({
          open: false,
          onClose: () => {},
          mode: 'create',
          meeting: {},
        })
      );
    }
    setLoading(false);
  }

  return (
    <Dialog open={formDialogState.open} onClose={formDialogState.onClose} aria-labelledby="form-dialog-title">
      {loading && <LinearProgress />}
      <form onSubmit={submitData}>
        <DialogTitle id="form-dialog-title">Create/Edit a Meeting</DialogTitle>
        {error && <Alert severity="error">An Error has occurred. Please check your input</Alert>}
        <DialogContent>
          <input hidden name="id" value={formDialogState.meeting?._id} ref={idInputRef} />
          <input hidden name="day" value={formDialogState.meeting?.day} ref={dayInputRef} />
          <TextField
            name="name"
            inputRef={nameInputRef}
            label="Name"
            fullWidth
            defaultValue={formDialogState.meeting?.name}
            required
          />
          <TextField
            name="link"
            type="url"
            inputRef={linkInputRef}
            label="Link"
            fullWidth
            defaultValue={formDialogState.meeting?.link}
            required
          />
          <TextField
            name="password"
            inputRef={passwordInputRef}
            label="Passwort"
            fullWidth
            defaultValue={formDialogState.meeting?.password}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={formDialogState.onClose}>
            Cancel
          </Button>
          <Button disabled={loading} type="submit" color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormDialog;
