const initialState = {
  loading: false,
  gradeId: null,
  grades: [],
};

const gradesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_GRADES":
      return {
        ...state,
        grades: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default gradesReducer;
