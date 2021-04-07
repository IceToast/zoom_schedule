import React from 'react';
import {Grid} from '@material-ui/core';
import {Day} from '.';

const DaysContainer = week => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {week.map(day => (
        <Day dayName={day.name} meetings={day.meetings}></Day>
      ))}
    </Grid>
  );
};

export default DaysContainer;
