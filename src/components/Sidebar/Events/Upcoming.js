import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Event from 'components/Sidebar/Events/Event';
import { useStateValue } from 'context/State';
import { filterUpcommingEvents } from 'common/filters';
import { isEmpty } from 'common/helpers';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff'
  }
});

const Events = () => {
  const classes = useStyles();
  const [{ calendar, events }] = useStateValue();
  const { todayMoment } = calendar;
  const filtered = filterUpcommingEvents(events, todayMoment);
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

export default Events;
