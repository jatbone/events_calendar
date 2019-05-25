import calendarReducer from 'reducer/calendar';
import eventsReducer from 'reducer/events';
import formReducer from 'reducer/form';

export default ({ calendar, events, form }, action) => {
  return {
    calendar: calendarReducer(calendar, action),
    events: eventsReducer(events, action),
    form: formReducer(form, action)
  };
};
