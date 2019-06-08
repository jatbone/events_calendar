import React, { Fragment } from 'react';

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

export default Sidebar;
