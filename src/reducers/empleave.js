const initialState = {
  loading: false,
  districtId: null,
  empleave: [],
};

const empleaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_EMPLIST":
      return {
        ...state,
        empleave: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default empleaveReducer;

