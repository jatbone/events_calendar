import React from 'react';

import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core/styles';

const useStylesCustomTextField = makeStyles(theme => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff'
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
}));

const CTextField = ({ InputProps, InputLabelProps, customStyles, ...rest }) => {
  const classes = useStylesCustomTextField();
  return (
    <TextField
      InputProps={{ ...{ classes, disableUnderline: true }, ...InputProps }}
      InputLabelProps={{ ...{ shrink: true }, ...InputLabelProps }}
      {...rest}
    />
  );
};

export default CTextField;
