import React from 'react';

import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStylesCustomTextField = makeStyles(theme => ({
  root: {
    border: '1px solid #f4f2f7',
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: '#f4f2f7',
    transition: theme.transitions.create(['border-color']),
    '&:hover': {
      backgroundColor: '#f4f2f7',
    },
    '&$focused': {
      backgroundColor: '#f4f2f7',
      boxShadow: 'none',
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
