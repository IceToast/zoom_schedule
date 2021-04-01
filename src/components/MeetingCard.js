import React from 'react';
import {Card, Typography} from '@material-ui/core';

const MeetingCard = ({name, link, password}) => {
  return (
    <Card>
      <Typography>{name}</Typography>
      <Typography>{link}</Typography>
      <Typography>{password}</Typography>
    </Card>
  );
};

export default MeetingCard;
