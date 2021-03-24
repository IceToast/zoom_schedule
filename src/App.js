import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Typography} from '@material-ui/core';
import {Schedule} from './components';

const useStyles = makeStyles(theme => ({
  root: {flexGrow: 1},
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Typography variant="h4" className={classes.title}>
          Zoom-Schedule
        </Typography>
      </AppBar>
      <Schedule />
    </div>
  );
};

export default App;
