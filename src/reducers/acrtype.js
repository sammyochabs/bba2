const initialState = {
  loading: false,
  acrTypeId: null,
  acrType: [],
};

const acrTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ACR_TYPE":
      return {
        ...state,
        acrType: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default acrTypeReducer;
