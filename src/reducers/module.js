const initialState = {
  module: "Dashboard",
};

const moduleReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "SET_MODULE":
      return {
        ...state,
        ...rest,
      };
    default:
      return state;
  }
};

export default moduleReducer;
