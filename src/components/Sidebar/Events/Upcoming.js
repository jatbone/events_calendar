import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';

import { useStateValue } from 'context/State';
import { isEmpty } from 'common/helpers';
import Event from 'components/Sidebar/Events/Event';

const styles = () => ({
  root: {
    backgroundColor: '#fff'
  }
});

const comparator = (diffToDate, date1, date2) => {
  const diffToDateM = moment(diffToDate);
  const date1Diff = moment(date1).diff(diffToDateM, 'minutes');
  const date2Diff = moment(date2).diff(diffToDateM, 'minutes');
  if (date1Diff < date2Diff) {
    return -1;
  } else if (date1Diff > date2Diff) {
    return 1;
  } else {
    return 0;
  }
};

const filterEvents = (events, todayMoment) => {
  return Array.isArray(events)
    ? events
        .filter(event => {
          const { startDate, endDate } = event;
          if (endDate) {
            return moment(endDate).isSameOrAfter(todayMoment);
          }
          return moment(startDate).isSameOrAfter(todayMoment);
        })
        .sort((event1, event2) => {
          const { startDate: event1Start, endDate: event1End } = event1;
          const { startDate: event2Start, endDate: event2End } = event2;
          const event1Date = event1End ? event1End : event1Start;
          const event2Date = event2End ? event2End : event2Start;
          return comparator(todayMoment, event1Date, event2Date);
        })
    : [];
};

const Events = ({ classes }) => {
  const [{ calendar, events }] = useStateValue();
  const { todayMoment } = calendar;
  const filtered = filterEvents(events, todayMoment);
  return (
    <div className={classes.root}>
      {!isEmpty(filtered) ? (
        <div>
          {filtered.map(event => (
            <Event key={'upcoming-date-event-' + event.id} data={event} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

Events.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Events);
