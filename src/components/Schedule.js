import React from 'react';
import { useSelector } from 'react-redux';
import { DaysContainer } from '.';

const Schedule = () => {
  const days = useSelector(state => state.meetings.days);

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
          { name: 'Wednesday' },
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
          { name: 'Saturday' },
        ]}
      />
    );
  }

  return <DaysContainer days={days} />;
};
export default Schedule;
