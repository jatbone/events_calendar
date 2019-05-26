import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { useStateValue } from 'context/State';

import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import { Typography } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';

const styles = theme => ({
  card: {
    maxWidth: '100%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  showNoteIconButton: {
    padding: 0
  },
  cardHeader: {
    position: 'relative'
  },
  action: {
    position: 'absolute',
    margin: 0,
    bottom: '16px',
    right: '16px'
  }
});

const DATE_FORMAT = 'MMM DD,YYYY HH:mm';

const Event = ({ data, classes }) => {
  const { name, startDate, endDate, note, color } = data;
  const [isHidden, setIsHidden] = useState(true);
  const [, dispatch] = useStateValue();
  const onClick = e => {
    e.preventDefault();
    setIsHidden(!isHidden);
  };
  const onEditClick = e => {
    e.preventDefault();
    dispatch({ type: 'SET_IS_HIDDEN', payload: { newIsHidden: false } });
  };
  let formattedDate = '';
  if (endDate) {
    formattedDate =
      moment(startDate).format(DATE_FORMAT) +
      ' - ' +
      moment(endDate).format(DATE_FORMAT);
  } else {
    formattedDate = moment(startDate).format(DATE_FORMAT);
  }
  return (
    <div>
      <div>dot</div>
      <Card>
        <CardHeader
          title={name}
          subheader={formattedDate}
          classes={{ root: classes.cardHeader, action: classes.action }}
          action={
            <div>
              <IconButton
                classes={{ root: classes.showNoteIconButton }}
                onClick={onEditClick}
              >
                <Edit />
              </IconButton>
              <IconButton
                classes={{ root: classes.showNoteIconButton }}
                onClick={onClick}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          }
        />
        <Collapse in={!isHidden} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{note}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

Event.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Event);
