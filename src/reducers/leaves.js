const initialState = {
  loading: false,
  leaveId: null,
  leavetypes: [],
};

const leavesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_LEAVES":
      return {
        ...state,
        leaves: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default leavesReducer;
