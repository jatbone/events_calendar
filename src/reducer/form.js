export default (state, action) => {
  switch (action.type) {
    case 'SET_IS_HIDDEN':
      return {
        ...state,
        isHidden: action.payload.newIsHidden
      };
    default:
      return state;
  }
};
