import React from 'react';

import Calendar from 'components/Calendar/index';
import Grid from '@material-ui/core/Grid';
import Sidebar from 'components/Sidebar';

const Layout = () => {
  return (
    <Grid container>
      <Calendar />
      <Sidebar />
    </Grid>
  );
};

export default Layout;
