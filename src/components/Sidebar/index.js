import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Events from 'components/Sidebar/Events';
import Form from 'components/Sidebar/Form';

const styles = theme => ({
  root: {
    position: 'relative',
    background: 'white',
    borderLeft: `1px solid ${theme.palette.grey[100]}`
  }
});

const Sidebar = ({ classes }) => {
  return (
    <Grid xs={12} md={4} xl={3} className={classes.root} item>
      <Events />
      <Form />
    </Grid>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
