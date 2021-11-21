const initialState = {
  loading: false,
  employeeId: null,
  employeeImage: null,
  employees: [],
  doc: null,
  employeeDocs: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case "GET_EMPLOYEE_DOC":
      return {
        ...state,
        doc: action.payload,
        loading: false,
      };
    case "SET_EMPLOYEE_ID":
      return {
        ...state,
        employeeId: action.payload,
        loading: false,
      };
    case "GET_EMPLOYEE_IMG":
      return {
        ...state,
        employeeImage: action.payload,
        loading: false,
      };
    case "GET_DOCS":
      return {
        ...state,
        employeeDocs: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default employeeReducer;
