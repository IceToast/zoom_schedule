import React from 'react';
import {useSelector} from 'react-redux';
import {Box, Typography} from '@material-ui/core';
import {MeetingCard} from '.';

const Day = ({dayName, meetings}) => {
  const meetingRooms = useSelector(state => state.meetings.meetingRooms);

  return (
    <Box color="primary.main">
      <Typography>{dayName}</Typography>
      {meetings?.map(meeting => {
        const meetingRoom = meetingRooms.find(
          meetingRoom => meetingRoom.id === meeting.id
        );
        return <MeetingCard {...meetingRoom}></MeetingCard>;
      })}
    </Box>
  );
};

export default Day;
