const initialState = {
  loading: false,
  user_id: null,
  overtimes: [],
  overtimestype :[]
};

const overtimesReducer = (state = initialState, action) => {
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
      case "GET_OVERTIMESTYPE":
      return {
        ...state,
        overtimestype: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default overtimesReducer;
