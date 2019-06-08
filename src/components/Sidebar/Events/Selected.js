import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Event from 'components/Sidebar/Events/Event';
import { useStateValue } from 'context/State';
import { isEmpty } from 'common/helpers';
import { filterSelectedDayEvents } from 'common/filters';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff'
  }
});

const Events = () => {
  const classes = useStyles();

  const [{ calendar, events }] = useStateValue();
  const { todayMoment, selectedDate } = calendar;
  const filtered = filterSelectedDayEvents(events, todayMoment, selectedDate);
  return (
    <div className={classes.root}>
      {!isEmpty(filtered) ? (
        <div>
          {filtered.map(event => {
            return (
              <Event key={'selected-date-event-' + event.id} data={event} />
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Events;
