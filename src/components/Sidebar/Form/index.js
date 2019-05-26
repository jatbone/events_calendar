import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { useStateValue } from 'context/State';

import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'none',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  show: { display: 'flex' },
  formSection: {
    padding: theme.spacing(1)
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(0)
  },
  filledInput: {
    borderRadius: '5px'
  }
});

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
      backgroundColor: 'red',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  }
}));

const CustomTextField = props => {
  const classes = useStylesCustomTextField();
  return (
    <TextField
      InputProps={{ classes, disableUnderline: true }}
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
};

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Event name is required!')
});

const initialValues = {
  name: '',
  start: '',
  end: ''
};

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
          href="#"
        >
          <Close />
        </IconButton>
      </header>
      <section className={classes.formSection}>
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form
              className={classes.form}
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Event name"
                    variant="filled"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name && touched.name && errors.name}
                    helperText={
                      errors.name && touched.name && errors.name
                        ? errors.name
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <CustomTextField
                    label="Event start"
                    variant="filled"
                    id="start"
                    name="start"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.start}
                    error={errors.start && touched.start && errors.start}
                    helperText={
                      errors.start && touched.start && errors.start
                        ? errors.start
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    label="Event end"
                    variant="filled"
                    id="end"
                    name="end"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.end}
                    error={errors.end && touched.end && errors.end}
                    helperText={
                      errors.end && touched.end && errors.end ? errors.end : ''
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Primary
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </section>
    </div>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
