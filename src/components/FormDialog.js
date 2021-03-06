import React, { useRef, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { createMeeting, editMeeting } from '../actions/actions.meeting';
import { setFormDialogState } from '../actions/actions.setFormDialogState';

const FormDialog = () => {
  const formDialogState = useSelector(state => state.formDialog);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const idInputRef = useRef();
  const dayInputRef = useRef();
  const nameInputRef = useRef();
  const linkInputRef = useRef();
  const passwordInputRef = useRef();

  const submitData = async e => {
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
  };

  return (
    <Dialog open={formDialogState.open} onClose={formDialogState.onClose} maxWidth="xs" aria-labelledby="form-dialog-title">
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
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            name="link"
            type="url"
            inputRef={linkInputRef}
            label="Link"
            fullWidth
            defaultValue={formDialogState.meeting?.link}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            name="password"
            inputRef={passwordInputRef}
            label="Password"
            fullWidth
            defaultValue={formDialogState.meeting?.password}
            variant="outlined"
            margin="normal"
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
};

export default FormDialog;
