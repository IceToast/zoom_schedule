import React from 'react';
import {Box, makeStyles, Typography, IconButton} from '@material-ui/core';
import {MeetingCard} from '.';
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

  return (
    <Box color="primary.main">
      <Typography className={classes.dayLabel} variant="h5">{dayName}</Typography>
      {meetings?.map(meeting => {
        return <MeetingCard {...meeting}></MeetingCard>;
      })}
      <div className={classes.addMeetingButtonContainer}>
        <IconButton onClick={() => alert("Adding meeting")}>
          <AddIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default Day;
