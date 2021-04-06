import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Avatar, Button, Typography} from '@material-ui/core';
import {Schedule, SignIn} from './components';
import { getCookie } from './util/cookieHelper';

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    backgroundColor: '#f27650',
  },
  appTitle: {
    fontSize: '1.5em',
    marginLeft: theme.spacing(1),
  },
  userButton: {},
}));

const App = () => {
  const classes = useStyles();

  if (!getCookie('session_id')) {
    return <SignIn />;
  } else {
    return (
      <>
        <AppBar position="static" className={classes.appBar}>
          <Typography variant="h4" className={classes.appTitle}>
            Zoom Schedule
          </Typography>
          <Button className={classes.userButton}>
            <Avatar src="/images/avatar.jpg"></Avatar>
          </Button>
        </AppBar>
        <Schedule />
      </>
    );
  }
};

export default App;
