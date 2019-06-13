import React from 'react';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import VerticalAlignBottom from '@material-ui/icons/VerticalAlignBottom';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import { useStateValue } from 'context/State';
import {
  HEADER_SWITCHER_MONTH_FORMAT,
  HEADER_SWITCHER_WEEK_FORMAT
} from 'constants/index';
import { filterUpcommingEvents } from 'common/filters';

const useSwitcherStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  arrow: {
    transition: 'all .3s',
    color: theme.palette.grey[500],
    background: 'rgba(0,0,0,.05)',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '36px',
    borderRadius: '3px',
    '&:hover': {
      color: theme.palette.grey[800],
      background: 'rgba(0,0,0,.08)'
    }
  },
  icon: {
    width: '0.8em',
    height: '0.8em'
  },
  dates: {
    margin: '0 8px',
    fontWeight: 'bold'
  }
}));

const MonthSwitcher = () => {
  const classes = useSwitcherStyles();
  const [{ calendar }, dispatch] = useStateValue();
  const { currentMoment } = calendar;
  const nextMonth = e => {
    e.preventDefault();
    dispatch({
      type: 'SET_CURRENT_MOMENT',
      payload: { newCurrentMoment: moment(currentMoment).add(1, 'months') }
    });
  };
  const prevtMonth = e => {
    e.preventDefault();
    dispatch({
      type: 'SET_CURRENT_MOMENT',
      payload: { newCurrentMoment: moment(currentMoment).subtract(1, 'months') }
    });
  };
  return (
    <nav className={classes.root}>
      <Link
        component="button"
        onClick={prevtMonth}
        classes={{ root: classes.arrow }}
      >
        <ChevronLeft classes={{ root: classes.icon }} />
      </Link>
      <Typography className={classes.dates}>
        {moment(currentMoment).format(HEADER_SWITCHER_MONTH_FORMAT)}
      </Typography>
      <Link
        component="button"
        onClick={nextMonth}
        classes={{ root: classes.arrow }}
      >
        <ChevronRight classes={{ root: classes.icon }} />
      </Link>
    </nav>
  );
};

const WeekSwithcer = () => {
  const classes = useSwitcherStyles();
  const [{ calendar }, dispatch] = useStateValue();
  const { currentMoment } = calendar;

  const nextWeek = e => {
    e.preventDefault();
    dispatch({
      type: 'SET_CURRENT_MOMENT',
      payload: { newCurrentMoment: moment(currentMoment).add(1, 'weeks') }
    });
  };

  const prevWeek = e => {
    e.preventDefault();
    dispatch({
      type: 'SET_CURRENT_MOMENT',
      payload: { newCurrentMoment: moment(currentMoment).subtract(1, 'weeks') }
    });
  };

  return (
    <nav className={classes.root}>
      <Link
        component="button"
        onClick={prevWeek}
        classes={{ root: classes.arrow }}
      >
        <ChevronLeft classes={{ root: classes.icon }} />
      </Link>
      <Typography className={classes.dates} variant="button">
        {moment(currentMoment)
          .startOf('week')
          .format(HEADER_SWITCHER_WEEK_FORMAT)}{' '}
        -{' '}
        {moment(currentMoment)
          .endOf('week')
          .format(HEADER_SWITCHER_WEEK_FORMAT)}
      </Typography>
      <Link
        component="button"
        onClick={nextWeek}
        classes={{ root: classes.arrow }}
      >
        <ChevronRight classes={{ root: classes.icon }} />
      </Link>
    </nav>
  );
};

const useActionsStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  addNewEventIcon: {
    display: 'inline-block',
    marginRight: theme.spacing(1)
  },
  item: {
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderRight: `1px solid ${theme.palette.grey[300]}`
    },
    '&:last-child': {
      marginRight: 0,
      paddingRight: 0,
      borderRight: 'none'
    }
  }
}));

const ActionsSection = () => {
  const classes = useActionsStyles();
  const [{ events, calendar }, dispatch] = useStateValue();
  const { todayMoment } = calendar;
  const upcommingEventsCount = filterUpcommingEvents(events, todayMoment, false)
    .length;
  const onAddClick = () => {
    dispatch({
      type: 'SET_SIDEBAR_HIDDEN',
      payload: { newSidebarIsHidden: false }
    });
    dispatch({ type: 'ADD_NEW_EVENT', payload: { newIsHidden: false } });
  };
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <Box className={classes.item}>
        <Badge badgeContent={upcommingEventsCount} color="secondary" showZero>
          <Tooltip title="Upcoming">
            <VerticalAlignBottom />
          </Tooltip>
        </Badge>
      </Box>
      <Box className={classes.item}>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddClick}
          href="#"
        >
          <AddCircleOutline className={classes.addNewEventIcon} />
          new event
        </Button>
      </Box>
    </Box>
  );
};

const useHeaderStyles = makeStyles({
  root: {
    display: 'block',
    textTransform: 'uppercase',
    width: '100%',
    margin: '20px 0'
  },
  todayButton: {
    marginRight: '10px'
  }
});

const Header = () => {
  const theme = useTheme();
  const classes = useHeaderStyles();
  const [, dispatch] = useStateValue();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const onTodayClick = () => {
    dispatch({
      type: 'SET_CURRENT_MOMENT',
      payload: { newCurrentMoment: moment() }
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-start">
            <Button
              variant="outlined"
              onClick={onTodayClick}
              className={classes.todayButton}
              href="#"
            >
              Today
            </Button>
            {matches ? <WeekSwithcer /> : <MonthSwitcher />}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <ActionsSection />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
