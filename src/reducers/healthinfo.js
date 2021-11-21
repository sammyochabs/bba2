const initialState = {
  loading: false,
  healthInfoId: null,
  healthInfos: [],
};

const healthInfosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_HEALTH_INFO":
      return {
        ...state,
        healthInfos: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default healthInfosReducer;
