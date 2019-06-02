import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import { useStateValue } from 'context/State';

import Grid from '@material-ui/core/Grid/index';

import Content from 'components/Calendar/Body/Cells/Content';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

const useStyles = makeStyles({
  gridContainer: {
    borderTop: '1px solid red',
    borderLeft: '1px solid red'
  },
  gridItem: {
    borderBottom: '1px solid red',
    boxShadow: 'inset -1px 0px 0px 0px red',
    cursor: 'pointer'
  },
  disabled: {
    cursor: 'default',
    background: '#efefef'
  },
  selected: {
    background: 'red'
  },
  today: {
    boxShadow: 'inset 0px 0px 0px 5px rgba(107,137,255,1)'
  }
});

const VeekView = ({ startDate, events, onDayClick }) => {
  const [{ calendar }] = useStateValue();
  const { selectedDate, todayMoment } = calendar;
  const classes = useStyles();
  let day = moment(startDate);
  const dayEvents = filterDayEvents(events, day);
  return (
    <Grid
      onClick={onDayClick(!day.isSame(selectedDate, 'day') ? day : null)}
      key={'calendar-cell-day-' + day.toISOString()}
      className={classNames(classes.gridItem, {
        [classes.selected]: day.isSame(selectedDate, 'day'),
        [classes.today]: day.isSame(todayMoment, 'day')
      })}
      item
      xs
    >
      <Content events={dayEvents} day={day} />
    </Grid>
  );
};

const MonthView = ({ startDate, events, onDayClick }) => {
  const [{ calendar }] = useStateValue();
  const { selectedDate, todayMoment, currentMoment } = calendar;
  const classes = useStyles();
  let day = moment(startDate);
  let days = [];
  for (let i = 0; i < 7; i++) {
    const dayCloned = moment(day);
    const dayEvents = filterDayEvents(events, day);
    days.push(
      <Grid
        onClick={
          day.isSame(currentMoment, 'month')
            ? onDayClick(
                !dayCloned.isSame(selectedDate, 'day') ? dayCloned : null
              )
            : undefined
        }
        key={'calendar-cell-day-' + day.toISOString()}
        className={classNames(classes.gridItem, {
          [classes.selected]: day.isSame(selectedDate, 'day'),
          [classes.disabled]: !day.isSame(currentMoment, 'month'),
          [classes.today]: day.isSame(todayMoment, 'day')
        })}
        item
        xs
      >
        <Content events={dayEvents} day={dayCloned} />
      </Grid>
    );
    day.add(1, 'day');
  }
  return days;
};

const Index = ({ startDate, events, weekView = false }) => {
  const [, dispatch] = useStateValue();
  const onDayClick = newSelectedDate => () => {
    dispatch({
      type: 'SET_SELECTED_DATE',
      payload: {
        newSelectedDate
      }
    });
  };
  if (weekView) {
    return (
      <VeekView startDate={startDate} events={events} onDayClick={onDayClick} />
    );
  }
  return (
    <MonthView startDate={startDate} events={events} onDayClick={onDayClick} />
  );
};

Index.propTypes = {
  startDate: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

export default Index;
