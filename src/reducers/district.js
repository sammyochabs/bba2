const initialState = {
  loading: false,
  districtId: null,
  districts: [],
};

const districtReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DISTRICTS":
      return {
        ...state,
        districts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default districtReducer;
