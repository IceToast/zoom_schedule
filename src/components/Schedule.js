import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loadMeetings} from '../actions/actions.loadMeetings';
import {LOAD_MEETINGS} from '../actions/actions.loadMeetings';
import { setLoggedInState } from '../actions/actions.setLoggedInState';

import {DaysContainer} from '.';
import {Query} from '@redux-requests/react';
import { Typography } from '@material-ui/core';

const RequestError = () => (
  <Typography>Ein Fehler ist aufgetaucht. Bitte versuche es erneut.</Typography>
);

const Spinner = () => (
  <Typography>Lädt...</Typography>
)

const Schedule = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMeetings()).then(({error}) => {
      const errResStatus = error?.response?.status;
      const errorMessage = error?.response?.data;

      if(errResStatus === 403 && errorMessage === 'invalid Cookie or session expired'){
        dispatch(setLoggedInState(false));
      }else{
        dispatch(setLoggedInState(true));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // use dummy data in development mode 
  /* if(process.env.NODE_ENV === 'development'){
    return <DaysContainer days={[{"name":"Monday","meetings":[{"_id":"606db63ecd93d8733fc2c407","name":"Meeting name","link":"http://zoommeeting.com","password":"12345"}]},{"name":"Tuesday"},{"name":"Wedensday"},{"name":"Thursday"},{"name":"Friday"},{"name":"Saturday"}]} />;
  } */

  return (
    <Query
      type={LOAD_MEETINGS}
      errorComponent={RequestError}
      loadingComponent={Spinner}
      noDataMessage={<p>There is no entity currently.</p>}>
      {({data}) => {
        return <DaysContainer days={data} />;
      }}
    </Query>
  );
};
export default Schedule;
