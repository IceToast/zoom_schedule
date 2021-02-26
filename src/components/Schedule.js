import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Day} from '.';
import {setWeekShort} from '../actions/actions.weekDays';

const Schedule = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWeekShort());
  }, [dispatch]);

  const weekDays = useSelector(state => state.weekDays);
  return weekDays.weekDays.map(day => <Day key={day} dayName={day} />);
};
export default Schedule;
