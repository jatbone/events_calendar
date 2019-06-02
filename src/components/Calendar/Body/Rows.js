import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { useStateValue } from 'context/State';
import Grid from '@material-ui/core/Grid';

import Cells from 'components/Calendar/Body/Cells';

const WeekView = ({ currentMoment, events }) => {
  const startDate = moment(currentMoment).startOf('week');
  const endDate = moment(currentMoment).endOf('week');
  const rows = [];
  let rowIndex = 0;
  let day = moment(startDate);
  while (day <= endDate) {
    rows.push(
      <Grid key={'calendar-row-' + rowIndex} container>
        <Cells events={events} startDate={moment(day)} weekView />
      </Grid>
    );
    day.add(1, 'days');
    rowIndex++;
  }
  return <Fragment>{rows}</Fragment>;
};

const MonthView = ({ currentMoment, events }) => {
  const startOfMonth = moment(currentMoment).startOf('month');
  const endOfMonth = moment(currentMoment).endOf('month');
  const startDate = moment(startOfMonth).startOf('week');
  const endDate = moment(endOfMonth).endOf('week');
  const rows = [];
  let rowIndex = 0;
  let day = moment(startDate);
  while (day <= endDate) {
    rows.push(
      <Grid key={'calendar-row-' + rowIndex} container>
        <Cells events={events} startDate={moment(day)} />
      </Grid>
    );
    day.add(7, 'days');
    rowIndex++;
  }
  return <Fragment>{rows}</Fragment>;
};

const Rows = ({ events }) => {
  const [{ calendar }] = useStateValue();
  const { currentMoment, weekView } = calendar;
  if (weekView) {
    return (
      <WeekView
        currentMoment={currentMoment}
        events={events}
      />
    );
  }
  return <MonthView currentMoment={currentMoment} events={events} />;
};

Rows.propTypes = {
  events: PropTypes.array.isRequired
};

export default Rows;
