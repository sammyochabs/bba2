const initialState = {
  loading: false,
  childrenId: null,
  children: [],
};

const childrenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_CHILDREN":
      return {
        ...state,
        children: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default childrenReducer;
