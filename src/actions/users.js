import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all users
export const getUsers = (users) => {
  return {
    type: 'GET_USERS',
    payload: users,
  }
}
export const fetchUsers = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/user/list', { params: { userID: userID } })
      .then((res) => {
        const { UserList } = res.data
        return dispatch(getUsers(UserList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new users
export const addUser = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/user/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert(res.data.message)
          //alert('Please make sure all fields are filled')
        } else {
          alert('User added successfully!')
          window.location.reload()
          return dispatch(fetchUsers(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update user
export const updateUser = (newUser, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/user/update', newUser, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`User updated successfully!`)
          window.location.reload()
          return dispatch(fetchUsers(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete user
export const disableUser = (user_id, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/user/disable', user_id, { params: { userID: userID } })
      .then(() => {
        alert('User deleted successfully!')
        return dispatch(fetchUsers(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
