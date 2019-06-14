import React from 'react';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { NotificationManager } from 'react-light-notifications';
import randomColor from 'randomcolor';
import moment from 'moment';

import { useStateValue } from 'context/State';

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CTextField from 'components/Sidebar/Form/CTextField';
import DateField from 'components/Sidebar/Form/DateField';
import ColorPicker from 'components/Sidebar/Form/ColorPicker';

import 'flatpickr/dist/flatpickr.min.css';

const useStyles = makeStyles(theme => ({
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
  header: {
    padding: '10px 15px',
    fontSize: '1.6em',
    color: theme.palette.grey[600],
    borderBottom: '1px solid #e0edff',
    display: 'flex',
    alignItems: 'center',
    minHeight: '56px'
  },
  headerCloseButton: {
    padding: '2px'
  },
  show: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  formSection: {
    padding: '15px'
  },
  formRow: {
    marginBottom: '10px'
  },
  formStartDateWrapper: {
    marginBottom: '10px',
    [theme.breakpoints.up('xl')]: {
      marginBottom: '0',
      marginRight: '10px'
    }
  },
  form: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  formFooter: {
    width: '100%',
    padding: '15px',
    borderTop: `1px solid ${theme.palette.grey[100]}`
  },
  colorPickerColumn: {
    display: 'flex'
  },
  eventNameTextField: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
}));

const Form = () => {
  const classes = useStyles();
  let initialValues = {
    name: '',
    startDate: '',
    endDate: '',
    note: '',
    color: ''
  };
  const [{ form, events }, dispatch] = useStateValue();
  const { isHidden, eventId = null } = form;
  let selectedEvent;
  if (isHidden) {
    return null;
  }
  if (eventId) {
    selectedEvent =
      Array.isArray(events) && events.find(event => event.id === eventId);
    if (selectedEvent) {
      initialValues = { ...initialValues, ...selectedEvent };
    }
  }
  const onCloseClick = e => {
    e.preventDefault();
    dispatch({ type: 'ADD_NEW_EVENT', payload: { newIsHidden: true } });
  };
  const onSubmit = (values, { setSubmitting }) => {
    if (eventId) {
      dispatch({ type: 'UPDATE_EVENT', payload: { eventId, values } });
      NotificationManager.success({
        title: 'Success',
        message: 'Event was updated!'
      });
    } else {
      const newEvent = {
        id: events.length > 0 ? events[events.length - 1].id++ : 1,
        ...values
      };
      dispatch({ type: 'CREATE_EVENT', payload: { values: newEvent } });
      NotificationManager.success({
        title: 'Success',
        message: 'New event was created!'
      });
    }
    setSubmitting(false);
    dispatch({ type: 'ADD_NEW_EVENT', payload: { newIsHidden: true } });
  };
  const defaultColor =
    initialValues.color || randomColor({ luminosity: 'light' });
  return (
    <div className={classNames(classes.root, { [classes.show]: !isHidden })}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Event name is required!'),
          startDate: Yup.string().required('Event start is required!'),
          color: Yup.string().required('Event color is required!'),
          endDate: Yup.string().test(
            'endDate min test',
            'Event end date must be after start date!',
            function(value) {
              let startDate = this.resolve(Yup.ref('startDate'));
              if (startDate && value) {
                return moment(value).isAfter(startDate);
              }
              return true;
            }
          )
        })}
        onSubmit={onSubmit}
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
        }) => {
          return (
            <form
              className={classes.form}
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              <header className={classes.header}>
                <IconButton
                  color="primary"
                  aria-label="Close sidebar form"
                  onClick={onCloseClick}
                  classes={{ root: classes.headerCloseButton }}
                  href="#"
                >
                  <ArrowBack />
                </IconButton>
              </header>
              <section className={classes.formSection}>
                <Grid container spacing={0} className={classes.formRow}>
                  <Grid item xs={10}>
                    <CTextField
                      label="Event name"
                      variant="filled"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      error={errors.name && touched.name}
                      helperText={
                        errors.name && touched.name ? errors.name : ''
                      }
                      classes={{ root: classes.eventNameTextField }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.colorPickerColumn}>
                    <ColorPicker
                      defaultColor={defaultColor}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={0} className={classes.formRow}>
                  <Grid item xs={12} xl={6}>
                    <div className={classes.formStartDateWrapper}>
                      <DateField
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
                        defaultDate={initialValues.startDate || null}
                        fullWidth
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} xl={6}>
                    <DateField
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
                      defaultDate={initialValues.endDate || null}
                      optional={!initialValues.endDate}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={0} className={classes.formRow}>
                  <Grid item xs={12}>
                    <CTextField
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
              <footer className={classes.formFooter}>
                <Button
                  disabled={isSubmitting}
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
          );
        }}
      </Formik>
    </div>
  );
};

export default Form;
