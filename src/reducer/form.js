export default (state, action) => {
  switch (action.type) {
    case 'SET_IS_HIDDEN':
      return {
        ...state,
        isHidden: action.payload.newIsHidden
      };
    case 'EDIT_EVENT':
      return {
        ...state,
        eventId: action.payload.eventId,
        isHidden: false
      };
    default:
      return state;
  }
};
