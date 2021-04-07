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
  
  // use dummy data in development mode 
  if(process.env.NODE_ENV === 'development'){
    return <DaysContainer days={[{"name":"Monday","meetings":[{"_id":"606db63ecd93d8733fc2c407","name":"Meeting name","link":"http://zoommeeting.com","password":"12345"}]},{"name":"Tuesday"},{"name":"Wedensday"},{"name":"Thursday"},{"name":"Friday"},{"name":"Saturday"}]} />;
  }

  return (
    <Query
      type={LOAD_MEETINGS}
      errorComponent={RequestError}
      // loadingComponent={Spinner}
      noDataMessage={<p>There is no entity currently.</p>}>
      {({data}) => {
        console.log(data);
        return <DaysContainer days={data} />;
      }}
    </Query>
  );
};
export default Schedule;
