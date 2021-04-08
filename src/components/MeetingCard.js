import React from 'react';
import {Card, Typography, Link, makeStyles, IconButton} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteMeeting } from '../actions/actions.deleteMeeting';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(3, 2, 1, 1),
    
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1)
    }
    
  },
  deleteButton: {
    position: 'absolute',
    right: theme.spacing(0.3),
    top: theme.spacing(0.3),
    color: theme.palette.error.main
  },
  editButton: {
    position: 'absolute',
    right: theme.spacing(4),
    top: theme.spacing(0.3),
  },
  mettingName: {
    fontWeight: 'bold'
  }
}))


const MeetingCard = ({meeting, day}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  function getDeleteConfirm(){
    const confirmed = window.confirm("Bist du dir sicher?")
    if(confirmed){
      dispatch(deleteMeeting(meeting, day))
    }
  }

  return (
    <Card className={classes.root}>
      <IconButton className={classes.editButton} onClick={() => {}} size="small">
        <EditIcon />
      </IconButton>
      <IconButton className={classes.deleteButton} onClick={getDeleteConfirm} size="small">
        <DeleteIcon />
      </IconButton>
      <Typography className={classes.mettingName}>{meeting.name}</Typography>
      <Typography>
        <Link href={meeting.link} target="_blank">
          {meeting.link}
        </Link>
      </Typography>
      <Typography>Passwort: {meeting.password}</Typography>
    </Card>
  );
};

export default MeetingCard;
