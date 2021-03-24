import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addMeetingToDay} from '../actions/actions.week';
import {addMeeting} from '../actions/actions.meetings';

import {DaysContainer} from '.';

const Schedule = () => {
  const dispatch = useDispatch();
  const week = useSelector(state => state.week);

  useEffect(() => {
    fetch('https://zoomapi.icetoast.cloud/api/meeting', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(data => {
        data.forEach(meeting => {
          dispatch(addMeeting(meeting));
          dispatch(addMeetingToDay(meeting));
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DaysContainer days={week.days} />;
};
export default Schedule;
