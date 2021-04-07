import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loadMeetings} from '../actions/actions.loadMeetings';
import {LOAD_MEETINGS} from '../actions/actions.loadMeetings';

import {DaysContainer} from '.';
import {Query} from '@redux-requests/react';

const RequestError = () => (
  <p>There was some error during fetching. Please try again.</p>
);

const Schedule = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMeetings());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Query
      type={LOAD_MEETINGS}
      errorComponent={RequestError}
      // loadingComponent={Spinner}
      noDataMessage={<p>There is no entity currently.</p>}>
      {({data}) => {
        console.log(data);
        return <DaysContainer days={data.week.days} />;
      }}
    </Query>
  );
};
export default Schedule;
