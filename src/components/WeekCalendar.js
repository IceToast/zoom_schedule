import React from 'react';
import {Day} from '.';

const WeekCalendar = () => {
  const week = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return week.map(day => <Day dayName={day} />);
};
export default WeekCalendar;
