import React, { Fragment } from 'react';

import Header from 'components/Calendar/Header';
import WeekDays from 'components/Calendar/WeekDays';
import Body from 'components/Calendar/Body';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Calendar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Fragment>
      <Header />
      {!matches ? <WeekDays /> : ''}
      <Body />
    </Fragment>
  );
};

export default Calendar;
