import React, { useState } from 'react';
import {
  Card,
  Typography,
  makeStyles,
  Button,
  ButtonGroup,
  Grid,
  Snackbar,
  LinearProgress,
  Tooltip,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeeting } from '../actions/actions.meeting';
import { PlayArrow, Delete, Edit } from '@material-ui/icons';
import { setFormDialogState } from '../actions/actions.setFormDialogState';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 1, 2, 1),
    borderTop: `0.25em solid ${theme.palette.primary.main}`,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    width: '65%',
    '& Button': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '5em',
      height: '3.5vh',
      width: '100%',
      marginTop: theme.spacing(1),
      color: 'white',
      '&.MuiButton-outlined': {
        border: '1px solid rgba(255, 255, 255, 0.23)',
      },
    },
    '& .MuiButtonGroup-root': {
      width: '100%',
    },
  },
  joinButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5em',
    height: '2em',
  },
  meetingName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  joinIcon: {
    marginRight: theme.spacing(0.5),
  },
  bar: {
    transition: 'transform 0.05s linear',
  },
}));

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const MeetingCard = ({ meeting, day }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userAgent = useSelector(state => state.user.userAgent);
  const [openCopySuccessSnackbar, setCopySuccessSnackbar] = useState(false);
  const [openCopyErrorSnackbar, setCopyErrorSnackbar] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const getDeleteConfirm = () => {
    const confirmed = window.confirm('Please confirm to delete Meeting!');
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

  const join = () => {
    if (meeting.password && navigator.clipboard) {
      try {
        navigator.clipboard.writeText(meeting.password);
      } catch (err) {
        setCopyErrorSnackbar(true);
      } finally {
        !openCopyErrorSnackbar && setCopySuccessSnackbar(true);
      }
    }
    if (!userAgent.browser.name.includes('Safari')) {
      setLoading(true);
      const loadingTimer = setInterval(() => {
        setLoadingProgress(oldProgress => {
          if (oldProgress >= 100) {
            clearInterval(loadingTimer);
            setLoading(false);
            window.open(meeting.link, '_blank');
            return 0;
          }
          return oldProgress + 1;
        });
      }, 20);
    } else {
      window.open(meeting.link, '_blank');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCopySuccessSnackbar(false);
    setCopyErrorSnackbar(false);
  };

  return (
    <Card className={classes.root}>
      {loading && <LinearProgress variant="determinate" value={loadingProgress} classes={{ bar: classes.bar }} />}
      <Grid container justify="center" alignItems="center" alignContent="center" direction="column">
        <Typography className={classes.meetingName}>{meeting.name}</Typography>
        <Snackbar
          open={openCopySuccessSnackbar}
          disableWindowBlurListener="true"
          autoHideDuration={10000}
          onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success">
            Meeting password: "{meeting.password}" copied to clipboard!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openCopyErrorSnackbar}
          disableWindowBlurListener="true"
          autoHideDuration={10000}
          onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="error">
            Meeting password: "{meeting.password}" could not be copied to clipboard!
          </Alert>
        </Snackbar>

        <div className={classes.buttonWrapper}>
          <Tooltip title="Join Meeting" aria-label="Join Meeting">
            <Button className={classes.joinButton} onClick={join} size="large">
              <PlayArrow className={classes.joinIcon} />
              Join
            </Button>
          </Tooltip>
          <ButtonGroup className={classes.metaButtons} size="large">
            <Tooltip title="Edit Meeting" aria-label="Edit Meeting">
              <Button onClick={openDialogForMeetingEdit}>
                <Edit />
              </Button>
            </Tooltip>
            <Tooltip title="Delete Meeting" aria-label="Delete Meeting">
              <Button onClick={getDeleteConfirm}>
                <Delete />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      </Grid>
    </Card>
  );
};

export default MeetingCard;
