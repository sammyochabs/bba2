const initialState = {
  loading: false,
  designationId: null,
  designations: [],
};

const designationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DESIGNATIONS":
      return {
        ...state,
        designations: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default designationReducer;
