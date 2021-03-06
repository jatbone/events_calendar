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

export const filterDayEvents = (events, day, sort = true) => {
  if (!Array.isArray(events)) {
    return [];
  }
  const result = events.filter(event => {
    const eventStartDate = moment(event.startDate);
    const eventEndDate = event.endDate ? moment(event.endDate) : null;
    if (eventEndDate) {
      return moment(day).within(
        moment.range(eventStartDate.startOf('day'), eventEndDate.endOf('day'))
      );
    }
    return moment(day).isSame(eventStartDate, 'day');
  });
  if (sort) {
    result.sort((event1, event2) => {
      const event1tStartDate = moment(event1.startDate);
      const event1EndDate = event1.endDate ? moment(event1.endDate) : null;
      const event2tStartDate = moment(event2.startDate);
      const event2EndDate = event2.endDate ? moment(event2.endDate) : null;
      if (event1EndDate && event2EndDate) {
        return (
          event2EndDate.diff(event2tStartDate, 'minutes') -
          event1EndDate.diff(event1tStartDate, 'minutes')
        );
      } else if (event1EndDate) {
        return event1EndDate.diff(event1tStartDate, 'minutes') > 1 ? -1 : 0;
      } else if (event2EndDate) {
        return event2EndDate.diff(event2tStartDate, 'minutes') > 1 ? 1 : 0;
      } else {
        return 0;
      }
    });
  }
  return result;
};
