export default (state, action) => {
  switch (action.type) {
    case 'ADD_NEW_EVENT':
      return {
        ...state,
        isHidden: action.payload.newIsHidden,
        eventId: null
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
