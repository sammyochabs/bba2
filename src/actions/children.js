import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all children
export const getChildren = (children) => {
  return {
    type: 'GET_CHILDREN',
    payload: children,
  }
}
export const fetchChildren = (employeeID, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/child/list', {
        params: { userID: userID, EmployeeID: employeeID },
      })
      .then((res) => {
        const { ChildList } = res.data
        return dispatch(getChildren(ChildList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new chil
export const addChild = (data, employeeID, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/child/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Child added successfully!')
          window.location.reload()
          return dispatch(fetchChildren(employeeID, userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update chil
export const updateChild = (newChild, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('child/update', newChild, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Child updated successfully!`)
          return dispatch(fetchChildren(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete chil
export const deleteChild = (childID, employeeID, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/child/delete', childID, { params: { userID: userID } })
      .then(() => {
        alert('Child deleted successfully!')
        return dispatch(fetchChildren(employeeID, userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
