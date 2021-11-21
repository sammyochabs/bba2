import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all leaves
export const getLeaves = (leaves) => {
  return {
    type: 'GET_LEAVES',
    payload: leaves,
  }
}
export const fetchLeaves = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/leave/list', { params: { userID: userID } })
      .then((res) => {
        const leaves = res.data.LeaveList
        return dispatch(getLeaves(leaves))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new leave
export const addLeave = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/leave/add', data, { params: { userID: userID } })
      .then(() => {
        alert('Leave added successfully!')
        return dispatch(fetchLeaves(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new leave
export const addLeaveEmployee = (data, userID, EmployeeID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/Employee/Leave', data, {
        params: { userID, EmployeeID },
      })
      .then(() => {
        alert('Leave added successfully!')
        //return dispatch(fetchLeaves(userID));
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update leave
export const updateLeave = (newLeave, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('leave/update', newLeave, { params: { userID: userID } })
      .then(() => {
        alert(`Leave updated successfully!`)
        return dispatch(fetchLeaves(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete leave
export const deleteLeave = (leaveId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('leave/delete', leaveId, { params: { userID: userID } })
      .then(() => {
        alert('leave deleted successfully!')
        return dispatch(fetchLeaves(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
