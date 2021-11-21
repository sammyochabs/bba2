const initialState = {
  loading: false,
  districtId: null,
  emplist: [],
    leavelist: [],
};

const emplistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_EMPLOYEELIST":
      return {
        ...state,
        emplist: action.payload,
        loading: false,
      };
        case "GET_LEAVELIST":
      return {
        ...state,
        leavelist: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default emplistReducer;

