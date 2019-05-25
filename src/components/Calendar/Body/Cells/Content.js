import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import CardContent from '@material-ui/core/CardContent/index';
import Card from '@material-ui/core/Card/index';
import CardHeader from '@material-ui/core/CardHeader/index';
import Event from 'components/Calendar/Body/Cells/Event';

const DATE_FORMAT = 'D';

const styles = () => ({
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

const Content = ({ classes, day, events }) => {
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
  classes: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

export default withStyles(styles)(Content);
