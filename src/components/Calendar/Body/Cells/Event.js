import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    background: theme.palette.grey[100],
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px'
  },
  first: {
    marginLeft: '10px'
  },
  last: {
    marginRight: '10px'
  }
});

const Event = ({ data, classes, isFirst = false, isLast = false }) => {
  const { name, color } = data;
  return (
    <div
      className={classNames(classes.root, {
        [classes.first]: isFirst,
        [classes.last]: isLast
      })}
      style={{ backgroundColor: color }}
    >
      {name}
    </div>
  );
};

Event.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Event);
