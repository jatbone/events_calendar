export default (state, action) => {
  switch (action.type) {
    case 'UPDATE_EVENT':
      return state.map(event => {
        if (event.id === action.payload.eventId)
          return {
            ...event,
            ...action.payload.values
          };
        return event;
      });
    case 'CREATE_EVENT':
      return [...state, { eventId: state.length, ...action.payload.values }];
    default:
      return state;
  }
};
