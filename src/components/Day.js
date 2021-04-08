import React from 'react';
import {Box, makeStyles, Typography, IconButton} from '@material-ui/core';
import {MeetingCard} from '.';
import { useDispatch } from 'react-redux';
import { setFormDialogState } from '../actions/actions.setFormDialogState';
import {
  Add as AddIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  dayLabel: {
    marginBottom: theme.spacing(1.5),
    textAlign: 'center'
  },
  addMeetingButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1)
  }
}))

const Day = ({dayName, meetings}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  function openDialogForMeetingCreation(day){
    dispatch(setFormDialogState({
      open: true,
      onClose: closeDialog,
      mode: 'create',
      meeting: {
        day
      }
    }))
  }

  function closeDialog(){
    dispatch(setFormDialogState({
      open: false,
      onClose: () => {},
      mode: 'create',
      meeting: {}
    }))
  }

  return (
    <Box color="primary.main">
      <Typography className={classes.dayLabel} variant="h5">{dayName}</Typography>
      {meetings?.map(meeting => {
        return <MeetingCard key={meeting._id} meeting={meeting} day={dayName}></MeetingCard>;
      })}
      <div className={classes.addMeetingButtonContainer}>
        <IconButton onClick={() => openDialogForMeetingCreation(dayName)}>
          <AddIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default Day;
