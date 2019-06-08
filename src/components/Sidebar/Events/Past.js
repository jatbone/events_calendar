import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Event from 'components/Sidebar/Events/Event';
import { useStateValue } from 'context/State';
import { isEmpty } from 'common/helpers';
import { filterPastEvents } from 'common/filters';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff'
  }
});

const Events = () => {
  const classes = useStyles();
  const [{ calendar, events }] = useStateValue();
  const { todayMoment } = calendar;
  const filtered = filterPastEvents(events, todayMoment);
  return (
    <div className={classes.root}>
      {!isEmpty(filtered) ? (
        <ul>
          {filtered.map(event => (
            <Event key={'past-date-event-' + event.id} data={event} />
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default Events;
