import React from 'react';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';

import Rows from 'components/Calendar/Body/Rows';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useStateValue } from 'context/State';

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey['300']}`,
    background: '#fff'
  }
}));

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

const Body = () => {
  const classes = useStyles();
  const [{ calendar, events }] = useStateValue();
  const { currentMoment } = calendar;
  const filteredEvents = filterEvents(events, currentMoment);
  return (
    <Grid classes={{ container: classes.root }} container>
      <Rows events={filteredEvents} />
    </Grid>
  );
};

export default Body;
