import React from 'react';
import PropTypes from 'prop-types';

import CardContent from '@material-ui/core/CardContent/index';
import Card from '@material-ui/core/Card/index';
import CardHeader from '@material-ui/core/CardHeader/index';
import Event from 'components/Calendar/Body/Cells/Event';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  CARD_HEADER_DATE_FORMAT,
  CARD_HEADER_DATE_WEEKVIEW_FORMAT
} from 'constants/index';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0 0 10px 0',
    borderRadius: 0,
    boxShadow: 'none',
    background: 'transparent',
    minHeight: '120px',
    [theme.breakpoints.up('lg')]: {
      minHeight: '160px'
    },
    [theme.breakpoints.up('xl')]: {
      minHeight: '200px'
    }
  },
  cardContent: {
    padding: '0 !important',
    overflow: 'hidden',
    '&:last-child': {
      paddingBottom: 0
    }
  },
  cardHeader: {
    padding: '15px'
  },
  cardTitle: {
    fontSize: '1em',
    color: theme.palette.grey[900],
    fontWeight: 'bold',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.6em'
    }
  },
  cardTitleSelected: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: 'rgba(5,107,255,1)',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.6em'
    }
  }
}));

const Content = ({ day, events, isSelected = false }) => {
  const classes = useStyles();
  const theme = useTheme();
  const titleWeekFormatting = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: isSelected ? classes.cardTitleSelected : classes.cardTitle
        }}
        title={
          titleWeekFormatting
            ? day.format(CARD_HEADER_DATE_WEEKVIEW_FORMAT)
            : day.format(CARD_HEADER_DATE_FORMAT)
        }
      />
      <CardContent classes={{ root: classes.cardContent }}>
        {events.length
          ? events.map(event => {
              return (
                <Event
                  key={'calendar-event-' + event.id}
                  data={event}
                  isFirst={day.isSame(event.startDate, 'day')}
                  isLast={
                    event.endDate ? day.isSame(event.endDate, 'day') : true
                  }
                />
              );
            })
          : ''}
      </CardContent>
    </Card>
  );
};

Content.propTypes = {
  day: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

export default Content;
