const initialState = {
  loading: false,
  overtimeId: null,
  overtimes: [],
};

const overtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_OVERTIMES":
      return {
        ...state,
        overtimes: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default overtimeReducer;
