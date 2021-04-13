import React from 'react';
import { Card, Typography, Link, makeStyles, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteMeeting } from '../actions/actions.meeting';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { setFormDialogState } from '../actions/actions.setFormDialogState';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(3, 2, 1, 1),

    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  deleteButton: {
    position: 'absolute',
    right: theme.spacing(0.3),
    top: theme.spacing(0.3),
    color: theme.palette.error.main,
  },
  editButton: {
    position: 'absolute',
    right: theme.spacing(4),
    top: theme.spacing(0.3),
  },
  meetingName: {
    fontWeight: 'bold',
  },
}));

const MeetingCard = ({ meeting, day }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const getDeleteConfirm = () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      dispatch(deleteMeeting(meeting, day));
    }
  };

  const openDialogForMeetingEdit = () => {
    dispatch(
      setFormDialogState({
        open: true,
        onClose: closeDialog,
        mode: 'edit',
        meeting: {
          day,
          ...meeting,
        },
      })
    );
  };

  const closeDialog = () => {
    dispatch(
      setFormDialogState({
        open: false,
        onClose: () => {},
        mode: 'create',
        meeting: {},
      })
    );
  };

  const join = async () => {
    await navigator.clipboard.writeText(meeting.password);
    window.open(meeting.link, '_blank');
  };

  return (
    <Card className={classes.root}>
      <IconButton className={classes.editButton} onClick={openDialogForMeetingEdit} size="small">
        <EditIcon />
      </IconButton>
      <IconButton className={classes.deleteButton} onClick={getDeleteConfirm} size="small">
        <DeleteIcon />
      </IconButton>
      <Typography className={classes.meetingName}>{meeting.name}</Typography>
      <Typography>
        <Link onClick={join} target="_blank">
          Join Link
        </Link>
      </Typography>
      <Typography>Password: {meeting.password?}</Typography>
    </Card>
  );
};

export default MeetingCard;
