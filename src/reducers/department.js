const initialState = {
  loading: false,
  departmentId: null,
  departments: [],
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DEPARTMENTS":
      return {
        ...state,
        departments: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default departmentReducer;
