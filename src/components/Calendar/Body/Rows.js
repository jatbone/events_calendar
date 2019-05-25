import React, { Fragment } from 'react';
import moment from 'moment';

import { useStateValue } from 'context/State';
import Grid from '@material-ui/core/Grid';

import Cells from 'components/Calendar/Body/Cells/index';

const filterEvents = (events, currentMoment) => {
  const startOfMonth = moment(currentMoment).startOf('month');
  const endOfMonth = moment(currentMoment).endOf('month');
  return Array.isArray(events)
    ? events.filter(event => {
        if (event.endDate) {
          return moment
            .range(moment(event.startDate), moment(event.endDate))
            .overlaps(moment.range(startOfMonth, endOfMonth));
        }
        return moment(event.startDate).within(
          moment.range(startOfMonth, endOfMonth)
        );
      })
    : [];
};

const Rows = () => {
  const [{ calendar, events }] = useStateValue();
  const { currentMoment } = calendar;
  const startOfMonth = moment(currentMoment).startOf('month');
  const endOfMonth = moment(currentMoment).endOf('month');
  const startDate = moment(startOfMonth).startOf('week');
  const endDate = moment(endOfMonth).endOf('week');
  const filteredEvents = filterEvents(events, currentMoment);
  const rows = [];

  let day = startDate;
  let rowIndex = 0;

  while (day <= endDate) {
    rows.push(
      <Grid key={'calendar-row-' + rowIndex} container>
        <Cells events={filteredEvents} startDate={moment(day)} />
      </Grid>
    );
    day.add(7, 'days');
    rowIndex++;
  }
  return <Fragment>{rows}</Fragment>;
};

export default Rows;
