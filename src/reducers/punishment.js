const initialState = {
  loading: false,
  punishmentId: null,
  punishments: [],
};

const punishmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PUNISHMENTS":
      return {
        ...state,
        punishments: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default punishmentReducer;
