import React from 'react';
import moment from 'moment';

import { useStateValue } from 'context/State';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { WEEKDAYS_DATE_FORMAT } from 'constants/index';

const WeekDays = () => {
  const [{ calendar }] = useStateValue();
  const { currentMoment } = calendar;
  const startDate = moment(currentMoment).startOf('week');
  const days = [];
  for (let i = 0; i < 7; i++) {
    const dayOfWeek = moment(startDate).add(i, 'days');
    days.push(
      <Grid item key={i} xs>
        <Typography variant="body2" gutterBottom>
          {moment(dayOfWeek).format(WEEKDAYS_DATE_FORMAT)}
        </Typography>
      </Grid>
    );
  }

  return <Grid container>{days}</Grid>;
};

export default WeekDays;
