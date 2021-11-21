const initialState = {
  loading: false,
  healthRecordId: null,
  healthRecords: [],
};

const healthRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_HealthRecords":
      return {
        ...state,
        healthRecords: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default healthRecordsReducer;
