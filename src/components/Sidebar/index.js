import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Events from 'components/Sidebar/Events';
import Form from 'components/Sidebar/Form';



const Sidebar = () => {
  return (
    <Fragment>
      <Events />
      <Form />
    </Fragment>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Sidebar;
