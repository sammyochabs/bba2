const initialState = {
  loading: false,
  user_id: null,
  empLoan: [],
};

const empLoanReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PROMOTIONLIST":
      return {
        ...state,
        empLoan: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default empLoanReducer;
