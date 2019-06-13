import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { useStateValue } from 'context/State';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Upcoming from 'components/Sidebar/Events/Upcoming';
import Past from 'components/Sidebar/Events/Past';
import Selected from 'components/Sidebar/Events/Selected';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

const EVENTS_TYPE_UPCOMING = 'upcoming';
const EVENTS_TYPE_SELECTED = 'selected';
const EVENTS_TYPE_PAST = 'past';

const styles = theme => ({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    backgroundColor: theme.palette.background.default,
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: theme.palette.primary.main,
    minHeight: 0
    // backgroundColor: '#e8e8ef'
    // backgroundColor: '#f6f6f9'
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      backgroundColor: theme.palette.primary.main,
      width: '90%'
    }
  },
  tab: {
    // borderRight: '1px solid #e0edff',
    borderBottom: '1px solid #e0edff',
    // boxShadow: 'inset 0px -1px 0px 0px #e0edff',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    minHeight: 0,
    maxWidth: '100%',
    padding: '8px 0',
    color: '#999',
    // color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '1em',
    textTransform: 'none',
    '&:focus': {
      opacity: 1
    },
    '&:hover': {
      opacity: 1
    },
    '&:last-child': {
      borderRight: 'none'
    }
  },
  tabSelected: {
    color: '#222',
    // backgroundColor: theme.palette.primary.main,
    // backgroundColor: theme.palette.background.default,
    fontWeight: theme.typography.fontWeightMedium
    // boxShadow: `inset 0px -1px 0px 0px ${theme.palette.background.paper}`
  },
  tabTextWrapper: {
    width: 'auto'
    // backgroundColor: 'rgba(255,255,255,.5)',
    // padding: '5px 10px'
  },
  textActive: {
    // display: 'inline-block',
    // color: '#fff',
    // background: theme.palette.primary.main
  },
  btnGroupWrapper: {
    padding: '10px'
  }
});

const Events = ({ classes }) => {
  const [value, setValue] = useState(0);
  const [{ calendar }] = useStateValue();
  const { selectedDate } = calendar;
  const handleChange = (event, value) => {
    setValue(value);
  };
  useEffect(() => {
    setValue(0);
  }, [selectedDate]);
  const tabsClasses = { root: classes.tabs, indicator: classes.indicator };
  const tabClasses = {
    root: classes.tab,
    selected: classes.tabSelected,
    wrapper: classes.tabTextWrapper
  };
  let isActive = EVENTS_TYPE_UPCOMING;
  if (selectedDate) {
    if (value === 0) {
      isActive = EVENTS_TYPE_SELECTED;
    }
    if (value === 1) {
      isActive = EVENTS_TYPE_UPCOMING;
    }
    if (value === 2) {
      isActive = EVENTS_TYPE_PAST;
    }
  } else {
    if (value === 0) {
      isActive = EVENTS_TYPE_UPCOMING;
    }
    if (value === 1) {
      isActive = EVENTS_TYPE_PAST;
    }
  }

  return (
    <div className={classes.wrapper}>
      <div>
        <Typography>Event title</Typography>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        classes={tabsClasses}
        TabIndicatorProps={{ children: <div /> }}
      >
        {selectedDate ? (
          <Tab
            label={
              <span
                className={
                  isActive === EVENTS_TYPE_SELECTED ? classes.textActive : ''
                }
              >
                {selectedDate.format('YYYY-MM-DD')}
              </span>
            }
            classes={tabClasses}
            disableRipple
          />
        ) : (
          ''
        )}
        <Tab
          label={
            <span
              className={
                isActive === EVENTS_TYPE_UPCOMING ? classes.textActive : ''
              }
            >
              Upcoming
            </span>
          }
          classes={tabClasses}
          disableRipple
        />
        <Tab
          label={
            <span
              className={
                isActive === EVENTS_TYPE_PAST ? classes.textActive : ''
              }
            >
              Past
            </span>
          }
          classes={tabClasses}
          disableRipple
        />
      </Tabs>
      {selectedDate ? (
        <Fragment>
          {isActive === EVENTS_TYPE_SELECTED && <Selected />}
          {isActive === EVENTS_TYPE_UPCOMING && <Upcoming />}
          {isActive === EVENTS_TYPE_PAST && <Past />}
        </Fragment>
      ) : (
        <Fragment>
          {isActive === EVENTS_TYPE_UPCOMING && <Upcoming />}
          {isActive === EVENTS_TYPE_PAST && <Past />}
        </Fragment>
      )}
    </div>
  );
};

Events.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Events);
