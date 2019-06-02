import React from 'react';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { useStateValue } from 'context/State';
import Button from '@material-ui/core/Button';

const DATE_FORMAT = 'MMMM YYYY';

const useSwitcherStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  arrow: {
    transition: 'all .3s',
    color: theme.palette.grey[500],
    '&:hover': {
      transform: 'scale(1.2)',
      color: theme.palette.primary.main
    }
  }
}));

const Switcher = () => {
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
      <Link component="button" onClick={prevtMonth} className={classes.arrow}>
        <ChevronLeft />
      </Link>
      <Typography variant="body1">
        {moment(currentMoment).format(DATE_FORMAT)}
      </Typography>
      <Link component="button" onClick={nextMonth} className={classes.arrow}>
        <ChevronRight />
      </Link>
    </nav>
  );
};

const useHeaderStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    textTransform: 'uppercase',
    width: '100%',
    padding: '1.75em 0',
    borderBottom: `1px solid ${theme.palette.grey[200]}`
  }
}));

const Header = () => {
  const classes = useHeaderStyles();
  const [, dispatch] = useStateValue();
  const onTodayClick = () => {
    dispatch({
      type: 'SET_CURRENT_MOMENT',
      payload: { newCurrentMoment: moment() }
    });
  };
  const onAddClick = () => {
    dispatch({ type: 'SET_IS_HIDDEN', payload: { newIsHidden: false } });
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="center">
        <Grid item xs={8}>
          <Switcher />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={onTodayClick}>
            Today
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={onAddClick}>
            Add new event
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
