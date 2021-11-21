import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all todos
export const getTodoList = (todos) => {
  return {
    type: 'GET_TODOS',
    payload: todos,
  }
}

export const fetchTodoList = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/todo/list', { params: { userID: userID } })
      .then((res) => {
        console.log(res.data)
        const { ToDoList } = res.data
        console.log(res.data)

        return dispatch(getTodoList(ToDoList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
export const fetchTodoListCalendar = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/todo/ListCalendar', { params: { userID: userID } })
      .then((res) => {
        console.log(res.data)
        const { ToDoList } = res.data
        console.log(res.data)

        return dispatch(getTodoList(ToDoList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
// fetch notification
export const fetchNotifications = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/settings/getallnotification', { params: { userID } })
      .then((res) => {
        const { NotifList } = res.data
        return dispatch({
          type: 'GET_NOTIFICATIONS_LIST',
          payload: NotifList,
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new todo
export const addTodo = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/todo/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('todo added successfully!')
          window.location.reload()
          return dispatch(fetchTodoList(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update todo
export const updateTodo = (newTodo, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('todo/update', newTodo, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Todo updated successfully!`)
          window.location.reload()
          return dispatch(fetchTodoList(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete Todo
export const deleteTodo = (todoId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('todo/delete', todoId, { params: { userID: userID } })
      .then(() => {
        alert('todo deleted successfully!')
        return dispatch(fetchTodoList(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
