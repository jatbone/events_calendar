import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { useStateValue } from 'context/State';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { Typography } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { SIDEBAR_EVENT_DATE_FORMAT } from 'constants/index';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    width: '100%',
    position: 'relative'
  },
  card: {
    borderLeft: ({ eventColor }) => `3px solid ${eventColor}`,
    flexGrow: 1,
    maxWidth: '100%',
    borderRadius: 0,
    boxShadow: 'inset 0px -1px 0px 0px #e0edff'
  },
  cardTitle: {
    fontSize: '1.1em',
    color: theme.palette.grey[600],
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2em'
    }
  },
  cardSubheader: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: theme.palette.grey[800],
    paddingRight: '65px'
  },
  cardContent: {
    paddingTop: 0
  },
  cardContentText: {},
  action: {
    position: 'absolute',
    margin: 0,
    bottom: '16px',
    right: '16px'
  },
  actionIconButton: {
    padding: '2px',
    border: 'none',
    marginRight: '5px',
    '&:last-child': {
      marginRight: 0
    }
  },
  actionIcon: {
    fontSize: '0.9em'
  }
}));

const Event = ({ data }) => {
  const { id, name, startDate, endDate, note, color } = data;
  const classes = useStyles({ eventColor: color });
  const [isHidden, setIsHidden] = useState(true);
  const [, dispatch] = useStateValue();
  const onClick = e => {
    e.preventDefault();
    setIsHidden(!isHidden);
  };
  const onEditClick = id => e => {
    e.preventDefault();
    dispatch({ type: 'EDIT_EVENT', payload: { eventId: id } });
  };
  let formattedDate = '';
  if (endDate) {
    formattedDate = `${moment(startDate).format(
      SIDEBAR_EVENT_DATE_FORMAT
    )} - ${moment(endDate).format(SIDEBAR_EVENT_DATE_FORMAT)}`;
  } else {
    formattedDate = moment(startDate).format(SIDEBAR_EVENT_DATE_FORMAT);
  }
  return (
    <div className={classes.wrapper}>
      <Card classes={{ root: classes.card }}>
        <CardHeader
          title={name}
          subheader={formattedDate}
          classes={{
            title: classes.cardTitle,
            subheader: classes.cardSubheader,
            action: classes.action
          }}
          action={
            <Fragment>
              <IconButton
                classes={{ root: classes.actionIconButton }}
                onClick={onEditClick(id)}
                href="#"
              >
                <Edit classes={{ root: classes.actionIcon }} />
              </IconButton>
              {note ? (
                <IconButton
                  classes={{ root: classes.actionIconButton }}
                  onClick={onClick}
                  href="#"
                >
                  {isHidden ? (
                    <MoreVertIcon classes={{ root: classes.actionIcon }} />
                  ) : (
                    <KeyboardArrowUp classes={{ root: classes.actionIcon }} />
                  )}
                </IconButton>
              ) : (
                ''
              )}
            </Fragment>
          }
        />
        {note ? (
          <Collapse in={!isHidden} timeout="auto" unmountOnExit>
            <CardContent classes={{ root: classes.cardContent }}>
              <Typography classes={{ root: classes.cardContentText }}>
                {note}
              </Typography>
            </CardContent>
          </Collapse>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

Event.propTypes = {
  data: PropTypes.object.isRequired
};

export default Event;
