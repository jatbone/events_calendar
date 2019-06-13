import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { invertColor } from 'common/helpers';

const styles = theme => ({
  root: {
    background: theme.palette.grey[100],
    minHeight: '30px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '0 10px',
    marginBottom: '2px',
    fontWeight: 'bold',
    overflow: 'auto'
  },
  text: {
    fontWeight: 'lighter',
    fontSize: '0.9em',
    [theme.breakpoints.up('md')]: {
      fontSize: '1em'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.1em'
    }
  },
  first: {
    marginLeft: '5px',
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px'
  },
  last: {
    marginRight: '5px',
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px'
  }
});

const Event = ({ data, classes, isFirst = false, isLast = false }) => {
  const { name, color } = data;
  return (
    <Typography
      className={classNames(classes.root, {
        [classes.first]: isFirst,
        [classes.last]: isLast
      })}
      style={{ backgroundColor: color, color: invertColor(color, true) }}
      component="div"
      variant="body2"
    >
      <span className={classNames(classes.text)}>{name}</span>
    </Typography>
  );
};

Event.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Event);
