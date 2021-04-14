import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { Day } from '.';
import FormDialog from './FormDialog';

const DaysContainer = ({ days }) => {
  return (
    <Container maxWidth="false">
      <Grid container direction="row" justify="center" spacing={2} style={{ padding: '0 4vw 0 4vw' }}>
        {days?.map(day => (
          <Grid key={day.name} item xs={12} sm={4} md={3} lg={2}>
            <Day dayName={day.name} meetings={day.meetings}></Day>
          </Grid>
        ))}
      </Grid>
      <FormDialog />
    </Container>
  );
};

export default DaysContainer;
