export default (state, action) => {
  switch (action.type) {
    case 'SET_SIDEBAR_HIDDEN':
      return {
        ...state,
        sidebarIsHidden: action.payload.newSidebarIsHidden,
      };
    default:
      return state;
  }
};
