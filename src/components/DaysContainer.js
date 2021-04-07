import React from 'react';
import {Grid, Container} from '@material-ui/core';
import {Day} from '.';

const DaysContainer = ({days}) => {
  return (
    <Container>
      <Grid container direction="row" justify="center" spacing={2}>
        {days?.map(day => (
          <Grid item xs={2}>
            <Day dayName={day.name} meetings={day.meetings}></Day>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DaysContainer;
