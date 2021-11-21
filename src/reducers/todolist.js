const initialState = {
  loading: false,
  taskId: null,
  todos: [],
  notificationsList: []
};

const todolistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case "GET_NOTIFICATIONS_LIST":
      return {
        ...state,
        notificationsList: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default todolistReducer;
