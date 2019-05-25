import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import { useStateValue } from 'context/State';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const styles = () => ({
  root: {
    display: 'none',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#ccc',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  show: { display: 'flex' }
});

const Form = ({ classes }) => {
  const [{ form }, dispatch] = useStateValue();
  const { isHidden } = form;
  const onCloseClick = e => {
    e.preventDefault();
    dispatch({ type: 'SET_IS_HIDDEN', payload: { newIsHidden: true } });
  };
  return (
    <div className={classNames(classes.root, { [classes.show]: !isHidden })}>
      <header>
        <IconButton
          color="primary"
          aria-label="Close sidebar form"
          onClick={onCloseClick}
        >
          <Close />
        </IconButton>
      </header>
      <section>form</section>
    </div>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
