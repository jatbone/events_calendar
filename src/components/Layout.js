import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import Badge from '@material-ui/core/Badge';

import { useStateValue } from 'context/State';
import Calendar from 'components/Calendar';
import Sidebar from 'components/Sidebar';
import { filterSelectedDayEvents } from 'common/filters';
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_XL } from 'constants/index';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: SIDEBAR_WIDTH,
      flexShrink: 0
    },
    [theme.breakpoints.up('xl')]: {
      width: SIDEBAR_WIDTH_XL
    }
  },
  drawerPaper: {
    borderLeft: '1px solid #e0edff',
    width: SIDEBAR_WIDTH,
    [theme.breakpoints.up('xl')]: {
      width: SIDEBAR_WIDTH_XL
    }
  },
  tempDrawerPaper: {
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '60%'
    }
  },
  main: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      padding: '40px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '40px'
    }
  },
  buttonHideMenu: {
    position: 'fixed',
    bottom: '5px',
    right: '5px',
    zIndex: theme.zIndex.modal + 1
  },
  buttonShowMenu: {
    position: 'fixed',
    bottom: '5px',
    right: '5px',
    zIndex: theme.zIndex.modal - 1
  }
}));

const Layout = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [{ app, events, calendar }, dispatch] = useStateValue();
  const { todayMoment, selectedDate } = calendar;
  const showSidebarButton = useMediaQuery(theme.breakpoints.down('sm'));
  const { sidebarIsHidden } = app;
  const selectedDayEventsCount = filterSelectedDayEvents(
    events,
    todayMoment,
    selectedDate,
    false
  ).length;
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
      <main className={classes.main}>
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
            className={classes.buttonHideMenu}
            href="#"
          >
            <CloseIcon />
          </Fab>
        ) : (
          ''
        )}
        {showSidebarButton ? (
          <Fab
            color="primary"
            aria-label="Add"
            onClick={handleDrawerToggle}
            className={classes.buttonShowMenu}
            href="#"
          >
            <Badge badgeContent={selectedDayEventsCount} color="secondary">
              <MenuIcon />
            </Badge>
          </Fab>
        ) : (
          ''
        )}
      </Hidden>
    </div>
  );
};

export default Layout;
