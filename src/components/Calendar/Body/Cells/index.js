import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import { useStateValue } from 'context/State';

import Grid from '@material-ui/core/Grid/index';

import Content from 'components/Calendar/Body/Cells/Content';

const filterDayEvents = (events, day) => {
  return Array.isArray(events)
    ? events
        .filter(event => {
          const eventStartDate = moment(event.startDate);
          const eventEndDate = event.endDate ? moment(event.endDate) : null;
          if (eventEndDate) {
            return moment(day).within(
              moment.range(
                eventStartDate.startOf('day'),
                eventEndDate.endOf('day')
              )
            );
          }
          return moment(day).isSame(eventStartDate, 'day');
        })
        .sort((event1, event2) => {
          const event1tStartDate = moment(event1.startDate);
          const event1EndDate = event1.endDate ? moment(event1.endDate) : null;
          const event2tStartDate = moment(event2.startDate);
          const event2EndDate = event2.endDate ? moment(event2.endDate) : null;
          if (event1EndDate && event2EndDate) {
            return (
              event2EndDate.diff(event2tStartDate, 'minutes') -
              event1EndDate.diff(event1tStartDate, 'minutes')
            );
          } else if (event1EndDate) {
            return event1EndDate.diff(event1tStartDate, 'minutes') > 1 ? -1 : 0;
          } else if (event2EndDate) {
            return event2EndDate.diff(event2tStartDate, 'minutes') > 1 ? 1 : 0;
          } else {
            return 0;
          }
        })
    : [];
};

const styles = () => ({
  selected: {
    background: 'red'
  },
  gridContainer: {
    borderTop: '1px solid red',
    borderLeft: '1px solid red'
  },
  gridItem: {
    borderBottom: '1px solid red',
    boxShadow: 'inset -1px 0px 0px 0px red',
    cursor: 'pointer'
  }
});

const Index = ({ classes, startDate, events }) => {
  const [{ calendar }, dispatch] = useStateValue();
  const { selectedDate } = calendar;
  let days = [];
  let day = moment(startDate);
  const onDayClick = newSelectedDate => () => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: { newSelectedDate } });
  };
  for (let i = 0; i < 7; i++) {
    const dayCloned = moment(day);
    const dayEvents = filterDayEvents(events, day);
    days.push(
      <Grid
        onClick={onDayClick(
          !dayCloned.isSame(selectedDate, 'day') ? dayCloned : null
        )}
        key={'calendar-cell-' + i + '-day-' + day.toISOString()}
        className={classNames(classes.gridItem, {
          [classes.selected]: day.isSame(selectedDate, 'day')
        })}
        item
        xs
      >
        <Content events={dayEvents} day={dayCloned} />
      </Grid>
    );
    day.add(1, 'day');
  }
  return <Fragment>{days}</Fragment>;
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

export default withStyles(styles)(Index);
