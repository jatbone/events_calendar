import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Rows from 'components/Calendar/Body/Rows';

const styles = () => ({
  gridContainer: {
    borderTop: '1px solid red',
    borderLeft: '1px solid red'
  }
});

const Body = ({ classes }) => {
  return (
    <Grid classes={{ container: classes.gridContainer }} container>
      <Rows />
    </Grid>
  );
};

Body.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Body);
