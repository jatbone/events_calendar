import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { useStateValue } from 'context/State';

const DATE_FORMAT = 'MMMM YYYY';

const styles = theme => ({
  root: {
    display: 'block',
    textTransform: 'uppercase',
    width: '100%',
    padding: '1.75em 0',
    borderBottom: `1px solid ${theme.palette.grey[200]}`
  },
  middle: {
    textAlign: 'center'
  },
  lastCell: {
    textAlign: 'right'
  },
  arrow: {
    transition: 'all .3s',
    color: theme.palette.grey[500],
    '&:hover': {
      transform: 'scale(1.2)',
      color: theme.palette.primary.main
    }
  }
});

const Header = ({ classes }) => {
  const [{ calendar }, dispatch] = useStateValue();
  const { currentMoment } = calendar;

  const nextMonth = e => {
    e.preventDefault();
    dispatch({
      type: 'SET_CURRENT_MONTH',
      payload: { newCurrentMoment: moment(currentMoment).add(1, 'months') }
    });
  };

  const prevtMonth = e => {
    e.preventDefault();
    dispatch({
      type: 'SET_CURRENT_MONTH',
      payload: { newCurrentMoment: moment(currentMoment).subtract(1, 'months') }
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="center">
        <Grid item xs={4} md>
          <Link
            component="button"
            onClick={prevtMonth}
            className={classes.arrow}
          >
            <ChevronLeft />
          </Link>
        </Grid>
        <Grid item xs={4} md className={classes.middle}>
          <Typography variant="body1">
            {moment(currentMoment).format(DATE_FORMAT)}
          </Typography>
        </Grid>
        <Grid item xs={4} md className={classes.lastCell}>
          <Link
            component="button"
            onClick={nextMonth}
            className={classes.arrow}
          >
            <ChevronRight />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
