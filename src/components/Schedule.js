import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchMeetings} from '../actions/actions.meeting';
import {setLoginState} from '../actions/actions.setLoginState';

import {DaysContainer} from '.';
import {Query} from '@redux-requests/react';
import {Container, Typography} from '@material-ui/core';

const RequestError = () => (
  <Container>
    <Typography>Ein Fehler ist aufgetaucht. Bitte versuche es erneut.</Typography>
  </Container>
);

const Spinner = () => (
  <Container>
    <Typography>Lädt...</Typography>
  </Container>
);

const Schedule = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeetings()).then(({error}) => {
      const errResStatus = error?.response?.status;
      const errorMessage = error?.response?.data;

      if (
        errResStatus === 403 &&
        errorMessage === 'invalid Cookie or session expired' &&
        process.env.NODE_ENV !== 'development'
      ) {
        dispatch(setLoginState(false));
      } else {
        dispatch(setLoginState(true));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // use dummy data in development mode
  if (process.env.NODE_ENV === 'development') {
    return (
      <DaysContainer
        days={[
          {
            name: 'Monday',
            meetings: [
              {
                _id: '606ef8bc7fe20230958101d7',
                name: 'New Meeting',
                link: 'https://randomlink.com',
                password: 'Password',
              },
            ],
          },
          {
            name: 'Tuesday',
            meetings: [
              {
                _id: '606ef8c27fe20230958101da',
                name: 'New Meeting',
                link: 'https://randomlink.com',
                password: 'Password',
              },
            ],
          },
          {name: 'Wedensday'},
          {
            name: 'Thursday',
            meetings: [
              {
                _id: '606ef8c77fe20230958101dd',
                name: 'New Meeting',
                link: 'https://randomlink.com',
                password: 'Password',
              },
            ],
          },
          {
            name: 'Friday',
            meetings: [
              {
                _id: '606ef8cb7fe20230958101e0',
                name: 'New Meeting',
                link: 'https://randomlink.com',
                password: 'Password',
              },
              {
                _id: '606ef8cb7fe20230958101e3',
                name: 'New Meeting',
                link: 'https://randomlink.com',
                password: 'Password',
              },
            ],
          },
          {name: 'Saturday'},
        ]}
      />
    );
  }

  return (
    <Query
      type={'fetchMeetings'}
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
