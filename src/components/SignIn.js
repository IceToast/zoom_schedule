import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Avatar, Button, Box, Typography, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '80vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginButtons: {
    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(2),
    '& Button': {
      margin: theme.spacing(1),
      justifyContent: 'space-between',
      height: '3em',
      border: 'solid #c9c9c9 0.5px',
    },
    '& img': {
      marginRight: theme.spacing(1),
      width: '2em',
      height: '2em',
    },
  },
}));

const SignIn = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box className={classes.loginButtons}>
        <Button id="google">
          <img alt="Sign In" src="/images/loginButtons/google.svg" />
          <span>with Google</span>
        </Button>
        <Button id="discord">
          <img alt="Sign In" src="/images/loginButtons/discord.svg" />
          <span>with Discord</span>
        </Button>
        <Button id="Github">
          <img alt="Sign In" src="/images/loginButtons/github.svg" />
          <span>with Github</span>
        </Button>
      </Box>
    </Grid>
  );
};

export default SignIn;
