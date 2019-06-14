import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import { useStateValue } from 'context/State';

import Grid from '@material-ui/core/Grid/index';

import Content from 'components/Calendar/Body/Cells/Content';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { filterDayEvents } from 'common/filters';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    position: 'relative'
  },
  gridItem: {
    borderBottom: `1px solid ${theme.palette.grey['300']}`,
    boxShadow: `inset -1px 0px 0px 0px ${theme.palette.grey['300']}`,
    cursor: 'pointer',
    '&:last-child': {
      boxShadow: 'none'
    }
  },
  disabled: {
    cursor: 'default',
    background: '#fffdf8'
  },
  today: {
    boxShadow: 'inset 0px 0px 0px 1px rgba(5,107,255,1) !important'
  },
  selected: {
    zIndex: 1,
    boxShadow:
      'inset 0px 0px 0px 4px rgba(5,107,255,1), 0px 0px 10px rgba(0,0,0,.2) !important',
    background: 'rgba(5,107,255,.05) !important',
    transition: 'all .1s'
  }
}));

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
    const isSelected = day.isSame(selectedDate, 'day');
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
          [classes.selected]: isSelected,
          [classes.disabled]: !day.isSame(currentMoment, 'month'),
          [classes.today]: day.isSame(todayMoment, 'day')
        })}
        item
        xs
      >
        <Content events={dayEvents} day={dayCloned} isSelected={isSelected} />
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
