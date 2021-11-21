const initialState = {
  loading: false,
  documentTypeId: null,
  documentTypes: [],
};

const documentTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DOCUMENT_TYPE":
      return {
        ...state,
        documentTypes: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default documentTypeReducer;
