const initialState = {
  loading: false,
  roleId: null,
  roles: [],
  roleModules: [],
  programsPermission: [],
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ROLES":
      return {
        ...state,
        roles: action.payload,
        loading: false,
      };
    case "GET_ROLE_MODULES":
      return {
        ...state,
        roleModules: action.payload,
        loading: false,
      };
    case "GET_PROGRAMS_PERMISSION":
      return {
        ...state,
        programsPermission: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default roleReducer;
