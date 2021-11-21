import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all designations
export const getDesignations = (designations) => {
  return {
    type: 'GET_DESIGNATIONS',
    payload: designations,
  }
}
export const fetchDesignations = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/designation/list', { params: { userID: userID } })
      .then((res) => {
        const designations = res.data.DesignationList
        return dispatch(getDesignations(designations))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new designation
export const addDesignation = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/designation/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Designations added successfully!')
          window.location.reload()
          return dispatch(fetchDesignations(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update designation
export const updateDesignation = (newDesignation, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('designation/update', newDesignation, {
        params: { userID: userID },
      })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Designation updated successfully!`)
          window.location.reload()
          return dispatch(fetchDesignations(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete designation
export const deleteDesignation = (designationId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/designation/delete', designationId, {
        params: { userID: userID },
      })
      .then(() => {
        alert('Designation deleted successfully!')
        return dispatch(fetchDesignations(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
