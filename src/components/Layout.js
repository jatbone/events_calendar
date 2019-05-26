import React from 'react';

import Calendar from 'components/Calendar/index';
import Grid from '@material-ui/core/Grid';
import Sidebar from 'components/Sidebar';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Layout = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Calendar />
      <Sidebar />
    </Grid>
  );
};

export default Layout;
