export default (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.payload.newSelectedDate
      };
    case 'SET_CURRENT_MONTH':
      return {
        ...state,
        currentMoment: action.payload.newcurrentMoment
      };
    default:
      return state;
  }
};
