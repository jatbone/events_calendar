import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import { useStateValue } from 'context/State';

import Upcoming from 'components/Sidebar/Events/Upcoming';
import Past from 'components/Sidebar/Events/Past';
import Selected from 'components/Sidebar/Events/Selected';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { SIDEBAR_EVENTS_SELECTED_DATE_FORMAT } from 'constants/index';

const EVENTS_TYPE_UPCOMING = 'upcoming';
const EVENTS_TYPE_SELECTED = 'selected';
const EVENTS_TYPE_PAST = 'past';

const styles = theme => ({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    padding: '10px 15px',
    fontSize: '1.6em',
    color: theme.palette.grey[600],
    borderBottom: '1px solid #e0edff',
    fontWeight: 400
  },
  btnGroupWrapper: {
    padding: '15px',
    background: '#fff',
    borderBottom: '1px solid #e0edff'
  },
  buttonGroup: {
    borderRadius: '3px',
    background: '#fff'
  },
  button: {
    borderRadius: '3px',
    padding: '6px 16px',
    opacity: 0.4,
    '&:hover': {
      opacity: 1,
      color: theme.palette.grey[500],
      background: theme.palette.grey[100],
      borderColor: theme.palette.grey[300]
    }
  },
  buttonIsActive: {
    opacity: 1,
    color: theme.palette.grey[500],
    background: theme.palette.grey[100],
    borderColor: theme.palette.grey[300],
    '&:not(:last-child)': {
      borderRight: 'none'
    },
    '&:hover': {
      opacity: 1,
      color: theme.palette.grey[500],
      background: theme.palette.grey[100],
      borderColor: theme.palette.grey[300]
    }
  },
  buttonSelectedIsActive: {
    opacity: 1,
    color: '#fff',
    background: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      color: '#fff',
      background: theme.palette.primary.main,
      borderColor: theme.palette.primary.main
    }
  },
  buttonLabel: {
    fontSize: '1em',
    textTransform: 'none'
  }
});

const Events = ({ classes }) => {
  const [value, setValue] = useState(0);
  const [{ calendar }] = useStateValue();
  const { selectedDate } = calendar;
  const onButtonClick = value => e => {
    e.preventDefault();
    setValue(value);
  };
  useEffect(() => {
    setValue(0);
  }, [selectedDate]);
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
      <Typography variant="h6" className={classes.title}>
        Your events
      </Typography>
      <div className={classes.btnGroupWrapper}>
        <ButtonGroup
          fullWidth
          aria-label="Full width outlined button group"
          classes={{ root: classes.buttonGroup }}
        >
          {selectedDate ? (
            <Button
              href="#"
              classes={{ root: classes.button, label: classes.buttonLabel }}
              className={classNames({
                [classes.buttonSelectedIsActive]:
                  isActive === EVENTS_TYPE_SELECTED
              })}
              onClick={onButtonClick(0)}
            >
              {selectedDate.format(SIDEBAR_EVENTS_SELECTED_DATE_FORMAT)}
            </Button>
          ) : (
            ''
          )}
          <Button
            href="#"
            classes={{ root: classes.button, label: classes.buttonLabel }}
            className={classNames({
              [classes.buttonIsActive]: isActive === EVENTS_TYPE_UPCOMING
            })}
            onClick={onButtonClick(selectedDate ? 1 : 0)}
          >
            Upcoming
          </Button>
          <Button
            href="#"
            classes={{ root: classes.button, label: classes.buttonLabel }}
            className={classNames({
              [classes.buttonIsActive]: isActive === EVENTS_TYPE_PAST
            })}
            onClick={onButtonClick(selectedDate ? 2 : 1)}
          >
            Past
          </Button>
        </ButtonGroup>
      </div>
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
