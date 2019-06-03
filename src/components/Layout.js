import React from 'react';

import { useStateValue } from 'context/State';
import Calendar from 'components/Calendar';
import Sidebar from 'components/Sidebar';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';

const drawerWidth = '320px';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  tempDrawerPaper: {
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '60%'
    }
  },
  content: {
    flexGrow: 1
  },
  fab: {
    position: 'fixed',
    bottom: '5px',
    right: '5px',
    zIndex: theme.zIndex.modal + 1
  }
}));

const Layout = () => {
  const classes = useStyles();
  const [{ app }, dispatch] = useStateValue();
  const { sidebarIsHidden } = app;
  const onDrawerCloseClick = () => {
    dispatch({
      type: 'SET_SIDEBAR_HIDDEN',
      payload: { newSidebarIsHidden: true }
    });
  };
  const handleDrawerToggle = () => {
    dispatch({
      type: 'SET_SIDEBAR_HIDDEN',
      payload: { newSidebarIsHidden: !sidebarIsHidden }
    });
  };
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Calendar />
      </main>
      <Hidden smDown implementation="js">
        <aside className={classes.drawer}>
          <Drawer
            anchor="right"
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <Sidebar />
          </Drawer>
        </aside>
      </Hidden>
      <Hidden mdUp implementation="js">
        <Drawer
          anchor="right"
          variant="temporary"
          open={!sidebarIsHidden}
          classes={{
            paper: classes.tempDrawerPaper
          }}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
        >
          <Sidebar />
        </Drawer>
        {!sidebarIsHidden ? (
          <Fab
            color="primary"
            onClick={onDrawerCloseClick}
            className={classes.fab}
          >
            <CloseIcon />
          </Fab>
        ) : (
          ''
        )}
      </Hidden>
    </div>
  );
};

export default Layout;
