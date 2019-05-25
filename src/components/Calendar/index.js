import React from 'react';

import Header from 'components/Calendar/Header';
import WeekDays from 'components/Calendar/WeekDays';
import Body from 'components/Calendar/Body';
import Grid from '@material-ui/core/Grid';

const Calendar = () => {
  return (
    <Grid xs={12} md={8} xl={9} item>
      <Header />
      <WeekDays />
      <Body />
    </Grid>
  );
};

export default Calendar;
