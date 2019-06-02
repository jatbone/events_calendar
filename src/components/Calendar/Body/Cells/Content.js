import React from 'react';
import PropTypes from 'prop-types';

import CardContent from '@material-ui/core/CardContent/index';
import Card from '@material-ui/core/Card/index';
import CardHeader from '@material-ui/core/CardHeader/index';
import Event from 'components/Calendar/Body/Cells/Event';
import makeStyles from '@material-ui/core/styles/makeStyles';

const DATE_FORMAT = 'D';

const useStyles = makeStyles({
  selected: {
    background: 'red'
  },
  card: {
    minHeight: '160px',
    borderRadius: 0,
    boxShadow: 'none',
    background: 'transparent'
  },
  cardContent: {
    padding: 0,
    overflow: 'hidden',
    '&:last-child': {
      paddingBottom: 0
    }
  }
});

const Content = ({ day, events }) => {
  const classes = useStyles();
  return (
    <Card classes={{ root: classes.card }}>
      <CardHeader title={day.format(DATE_FORMAT)} />
      <CardContent classes={{ root: classes.cardContent }}>
        {events.length
          ? events.map(event => {
              return (
                <Event
                  key={'calendar-event-' + event.id}
                  data={event}
                  isFirst={day.isSame(event.startDate, 'day')}
                  isLast={
                    event.endDate ? day.isSame(event.endDate, 'day') : true
                  }
                />
              );
            })
          : ''}
      </CardContent>
    </Card>
  );
};

Content.propTypes = {
  day: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

export default Content;
