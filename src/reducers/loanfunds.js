const initialState = {
  loading: false,
  loanFundId: null,
  loanfunds: [],
};

const loanFundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_LOAN_FUNDS":
      return {
        ...state,
        loanfunds: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default loanFundsReducer;
