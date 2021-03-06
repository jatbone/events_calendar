export default (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.payload.newSelectedDate
      };
    case 'SET_CURRENT_MOMENT':
      return {
        ...state,
        currentMoment: action.payload.newCurrentMoment
      };
    case 'SET_WEEK_VIEW':
      return {
        ...state,
        weekView: action.payload.newWeekView
      };
    default:
      return state;
  }
};
