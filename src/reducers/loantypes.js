const initialState = {
  loading: false,
  loantypeId: null,
  loantypes: [],
};

const loantypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_LOANTYPES":
      return {
        ...state,
        loantypes: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default loantypesReducer;
