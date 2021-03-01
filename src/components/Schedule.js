import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addMeetingToDay} from '../actions/actions.week';
import {addMeeting} from '../actions/actions.meetings';

import {Day} from '.';

const Schedule = () => {
  const dispatch = useDispatch();
  const week = useSelector(state => state.week);
  const meeting = {
    id: 1,
    order: 1,
    day: 'Monday',
    link: 'http://cloud.icetoast.de',
    name: 'Angewandte Mathematik',
  };

  useEffect(() => {
    dispatch(addMeeting(meeting));
    dispatch(addMeetingToDay(meeting));
  }, [dispatch]);

  return week.days.map(day => <Day dayName={day.name}></Day>);
};
export default Schedule;
