import React from 'react';
import {Card, Typography, Link, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mettingName: {
    fontWeight: 'bold'
  }
}))

const MeetingCard = ({name, link, password}) => {

  const classes = useStyles();

  return (
    <Card>
      <Typography className={classes.mettingName}>{name}</Typography>
      <Typography>
        <Link href={link} target="_blank">
          {link}
        </Link>
      </Typography>
      <Typography>Passwort: {password}</Typography>
    </Card>
  );
};

export default MeetingCard;
