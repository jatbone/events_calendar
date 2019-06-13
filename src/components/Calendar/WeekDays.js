import React from 'react';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import { WEEKDAYS_DATE_FORMAT } from 'constants/index';
import { useStateValue } from 'context/State';

const useStyles = makeStyles(theme => ({
  root: {
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
    background: '#fff',
    padding: '15px',
    fontSize: '0.9em',
    fontWeight: 'bold',
    color: theme.palette.grey[400],
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.2em',
      padding: '20px 15px'
    }
  }
}));

const WeekDays = () => {
  const classes = useStyles();
  const [{ calendar }] = useStateValue();
  const { currentMoment } = calendar;
  const startDate = moment(currentMoment).startOf('week');
  const days = [];
  for (let i = 0; i < 7; i++) {
    const dayOfWeek = moment(startDate).add(i, 'days');
    days.push(
      <Grid item key={i} xs>
        <Typography variant="body2" className={classes.root}>
          {moment(dayOfWeek).format(WEEKDAYS_DATE_FORMAT)}
        </Typography>
      </Grid>
    );
  }

  return <Grid container>{days}</Grid>;
};

export default WeekDays;
