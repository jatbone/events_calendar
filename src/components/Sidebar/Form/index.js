import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import flatpickr from 'flatpickr';
import ShortcutButtonsPlugin from 'shortcut-buttons-flatpickr';

import { useStateValue } from 'context/State';

import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';

import 'flatpickr/dist/flatpickr.min.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  show: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  formSection: {
    padding: theme.spacing(1),
    flex: 1
  },
  form: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(0)
  },
  filledInput: {
    borderRadius: '5px'
  },
  formFloatingFooter: {
    width: '100%',
    padding: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.grey[100]}`
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
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
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

const useStylesDatepickerOverlay = makeStyles(theme => ({
  wrapper: {
    position: 'relative'
  },
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 2,
    border: `1px solid red`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}));

const CustomDatePickerField = ({
  setFieldValue,
  setFieldTouched,
  optional = false,
  ...rest
}) => {
  const [isHidden, setIsHidden] = useState(optional);
  const datePickerRef = useRef(null);
  const classes = useStylesCustomTextField();
  const classesOverlay = useStylesDatepickerOverlay();
  const { name } = rest;
  useEffect(() => {
    flatpickr(datePickerRef.current, {
      dateFormat: 'M j,Y H:i',
      onChange: (selectedDates, dateStr, instance) => {
        const selectedDate = selectedDates[0] || null;
        if (selectedDate) {
          setFieldValue(name, moment(selectedDate).toISOString());
        } else {
          setFieldValue(name, '');
        }
      },
      onOpen: [
        (selectedDates, dateStr, instance) => {
          setFieldTouched(name, true);
        }
      ],
      enableTime: true,
      time_24hr: true,
      todayBtn: true,
      plugins: [
        ShortcutButtonsPlugin({
          button: [
            {
              label: 'Yesterday'
            },
            {
              label: 'Today'
            },
            {
              label: 'Tomorrow'
            }
          ],
          label: 'or',
          onClick: (index, fp) => {
            let date;
            switch (index) {
              case 0:
                date = moment().subtract(1, 'days');
                break;
              case 1:
                date = moment();
                break;
              case 2:
                date = moment().add(1, 'days');
                break;
              default:
                break;
            }
            fp.setDate(date.toDate());
          }
        })
      ]
    });
  }, []);
  const onAddEndDateClick = e => {
    e.preventDefault();
    setIsHidden(false);
  };
  return (
    <div className={classesOverlay.wrapper}>
      {isHidden ? (
        <div className={classesOverlay.root} onClick={onAddEndDateClick}>
          <AddCircle /> End date
        </div>
      ) : (
        ''
      )}
      <TextField
        InputProps={{ classes, disableUnderline: true }}
        InputLabelProps={{ shrink: true }}
        inputRef={datePickerRef}
        {...rest}
      />
    </div>
  );
};

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Event name is required!'),
  startDate: Yup.string().required('Event start required!')
});

const initialValues = {
  name: '',
  startDate: '',
  endDate: '',
  note: ''
};

const Form = ({ classes }) => {
  const [{ form }, dispatch] = useStateValue();
  const { isHidden } = form;
  if (isHidden) {
    return null;
  }
  const onCloseClick = e => {
    e.preventDefault();
    dispatch({ type: 'SET_IS_HIDDEN', payload: { newIsHidden: true } });
  };
  return (
    <div className={classNames(classes.root, { [classes.show]: !isHidden })}>
      <Formik
        enableReinitialize={true}
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
          isSubmitting,
          setFieldValue,
          setFieldTouched
        }) => (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            autoComplete="off"
            noValidate
          >
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
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name ? errors.name : ''}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <CustomDatePickerField
                    label="Event start"
                    variant="filled"
                    id="startDate"
                    name="startDate"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    error={errors.startDate && touched.startDate}
                    helperText={
                      errors.startDate && touched.startDate
                        ? errors.startDate
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomDatePickerField
                    label="Event end"
                    variant="filled"
                    id="endDate"
                    name="endDate"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    error={errors.endDate && touched.endDate}
                    helperText={
                      errors.endDate && touched.endDate ? errors.endDate : ''
                    }
                    optional
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Note"
                    variant="filled"
                    id="note"
                    name="note"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.note}
                    rows={5}
                    rowsMax={5}
                    multiline
                    fullWidth
                  />
                </Grid>
              </Grid>
            </section>
            <footer className={classes.formFloatingFooter}>
              <Button
                color="primary"
                variant="contained"
                component="button"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </footer>
          </form>
        )}
      </Formik>
    </div>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
