const initialState = {
  loading: false,
  disciplineId: null,
  disciplines: [],
};

const disciplinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_Disciplines":
      return {
        ...state,
        disciplines: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default disciplinesReducer;
