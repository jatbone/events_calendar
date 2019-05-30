import defaultEvents from 'data/events';

export const fetchAllEvents = () => {
  if (window.localStorage) {
    try {
      const events = JSON.parse(localStorage.getItem('events'));
      return events || defaultEvents;
    } catch (e) {
      return defaultEvents;
    }
  }
  return defaultEvents;
};
