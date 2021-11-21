const initialState = {
  loading: false,
  acrClassId: null,
  acrClass: [],
};

const acrClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ACR_CLASSES":
      return {
        ...state,
        acrClass: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default acrClassReducer;
