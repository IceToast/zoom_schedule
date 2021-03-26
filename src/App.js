import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Avatar, Button, Typography} from '@material-ui/core';
import {Schedule, SignIn} from './components';

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
  const [isLogged, setIsLogged] = useState(true);
  const loginHandler = () => {
    setIsLogged(!isLogged);
  };

  if (!isLogged) {
    console.log(isLogged);
    return <SignIn login={loginHandler} />;
  } else {
    console.log('App' + isLogged);
    return (
      <>
        <AppBar position="static" className={classes.appBar}>
          <Typography variant="h4" className={classes.appTitle}>
            Zoom Schedule
          </Typography>
          <Button className={classes.userButton} onClick={loginHandler}>
            <Avatar src="/images/avatar.jpg"></Avatar>
          </Button>
        </AppBar>
        <Schedule />
      </>
    );
  }
};

export default App;
