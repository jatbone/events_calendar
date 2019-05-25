import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { useStateValue } from 'context/State';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Upcoming from 'components/Sidebar/Events/Upcoming';
import Past from 'components/Sidebar/Events/Past';
import Selected from 'components/Sidebar/Events/Selected';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tab: {
    minWidth: '0',
    minHeight: '0',
    backgroundColor: '#d1e6ff',
    borderRadius: '4px',
    flex: 1,
    margin: '0 5px'
  },
  selected: {}
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
  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        {selectedDate ? (
          <Tab
            label={selectedDate.format('YYYY-MM-DD')}
            classes={{ root: classes.tab, selected: classes.selected }}
          />
        ) : (
          ''
        )}
        <Tab
          label="Upcoming"
          classes={{ root: classes.tab, selected: classes.selected }}
        />
        <Tab
          label="Past"
          classes={{ root: classes.tab, selected: classes.selected }}
        />
      </Tabs>
      {selectedDate ? (
        <Fragment>
          {value === 0 && <Selected />}
          {value === 1 && <Upcoming />}
          {value === 2 && <Past />}
        </Fragment>
      ) : (
        <Fragment>
          {value === 0 && <Upcoming />}
          {value === 1 && <Past />}
        </Fragment>
      )}
    </div>
  );
};

Events.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Events);
