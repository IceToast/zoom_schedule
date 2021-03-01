import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addMeetingToDay} from '../actions/actions.week';
import {addMeeting} from '../actions/actions.meetings';

import {DaysContainer} from '.';

const Schedule = () => {
  const dispatch = useDispatch();
  const week = useSelector(state => state.week);

  useEffect(() => {
    const meeting = {
      id: 1,
      order: 1,
      day: 'Monday',
      link: 'http://cloud.icetoast.de',
      name: 'Angewandte Mathematik',
    };
    dispatch(addMeeting(meeting));
    dispatch(addMeetingToDay(meeting));
  }, []);

  return <DaysContainer days={week.days} />;
};
export default Schedule;
