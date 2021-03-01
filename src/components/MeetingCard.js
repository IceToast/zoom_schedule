import React from 'react';
import {Card, Typography} from '@material-ui/core';

const MeetingCard = ({meetingRoom}) => {
  return (
    <Card>
      <Typography>{meetingRoom.name}</Typography>
    </Card>
  );
};

export default MeetingCard;
