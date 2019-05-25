import calendarReducer from 'reducer/calendar';

export default ({ calendar }, action) => {
  return {
    calendar: calendarReducer(calendar, action)
  };
};
