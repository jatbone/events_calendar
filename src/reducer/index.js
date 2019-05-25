import calendarReducer from 'reducer/calendar';
import eventsReducer from 'reducer/events';

export default ({ calendar, events }, action) => {
  return {
    calendar: calendarReducer(calendar, action),
    events: eventsReducer(events, action)
  };
};
