import appReducer from 'reducer/app';
import calendarReducer from 'reducer/calendar';
import eventsReducer from 'reducer/events';
import formReducer from 'reducer/form';

export default ({ app, calendar, events, form }, action) => {
  return {
    app: appReducer(app, action),
    calendar: calendarReducer(calendar, action),
    events: eventsReducer(events, action),
    form: formReducer(form, action)
  };
};
