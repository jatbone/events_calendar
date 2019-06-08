import moment from 'moment';

const getSortComparator = (diffToDate, date1, date2, order = null) => {
  const diffToDateM = moment(diffToDate);
  const date1Diff = moment(date1).diff(diffToDateM, 'minutes');
  const date2Diff = moment(date2).diff(diffToDateM, 'minutes');
  if (order === 'reverse') {
    if (date1Diff < date2Diff) {
      return 1;
    } else if (date1Diff > date2Diff) {
      return -1;
    } else {
      return 0;
    }
  } else {
    if (date1Diff < date2Diff) {
      return -1;
    } else if (date1Diff > date2Diff) {
      return 1;
    } else {
      return 0;
    }
  }
};

export const filterUpcommingEvents = (events, todayMoment, sort = true) => {
  if (!Array.isArray(events)) {
    return [];
  }
  const result = events.filter(event => {
    const { startDate, endDate } = event;
    if (endDate) {
      return moment(endDate).isSameOrAfter(todayMoment);
    }
    return moment(startDate).isSameOrAfter(todayMoment);
  });
  if (sort) {
    result.sort((event1, event2) => {
      const { startDate: event1Start, endDate: event1End } = event1;
      const { startDate: event2Start, endDate: event2End } = event2;
      const event1Date = event1End ? event1End : event1Start;
      const event2Date = event2End ? event2End : event2Start;
      return getSortComparator(todayMoment, event1Date, event2Date);
    });
  }
  return result;
};

export const filterSelectedDayEvents = (
  events,
  currentMoment,
  selectedDate,
  sort = true
) => {
  if (!Array.isArray(events)) {
    return [];
  }
  const result = events.filter(event => {
    const { startDate, endDate } = event;
    if (endDate) {
      return moment(selectedDate).within(
        moment.range(
          moment(startDate).startOf('day'),
          moment(endDate).endOf('day')
        )
      );
    }
    return moment(startDate).isSame(selectedDate, 'day');
  });
  if (sort) {
    result.sort((event1, event2) => {
      const { startDate: event1Start, endDate: event1End } = event1;
      const { startDate: event2Start, endDate: event2End } = event2;
      const event1Date = event1End ? event1End : event1Start;
      const event2Date = event2End ? event2End : event2Start;
      return getSortComparator(currentMoment, event1Date, event2Date);
    });
  }
  return result;
};

export const filterPastEvents = (events, todayMoment, sort = true) => {
  if (!Array.isArray(events)) {
    return [];
  }
  const result = events.filter(event => {
    const { startDate, endDate } = event;
    if (endDate) {
      return moment(endDate).isBefore(todayMoment);
    }
    return moment(startDate).isBefore(todayMoment);
  });
  if (sort) {
    result.sort((event1, event2) => {
      const { startDate: event1Start, endDate: event1End } = event1;
      const { startDate: event2Start, endDate: event2End } = event2;
      const event1Date = event1End ? event1End : event1Start;
      const event2Date = event2End ? event2End : event2Start;
      return getSortComparator(todayMoment, event1Date, event2Date, 'reverse');
    });
  }
  return result;
};
