import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all overtimeType
export const getOvertimes = (overtimes) => {
  return {
    type: 'GET_OVERTIMES',
    payload: overtimes,
  }
}
export const fetchOvertimes = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/overtimeType/list', { params: { userID: userID } })
      .then((res) => {
        const { OvertimeTypeList } = res.data
        return dispatch(getOvertimes(OvertimeTypeList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new overtimeType
export const addOvertime = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/overtimeType/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Overtime type added successfully!')
          window.location.reload()
          return dispatch(fetchOvertimes(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update overtimeType
export const updateOvertime = (newOvertime, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/overtimeType/update', newOvertime, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Overtime type updated successfully!`)
          window.location.reload()
          return dispatch(fetchOvertimes(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete overtimeType
export const deleteOvertime = (overtimeType, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/overtimeType/delete', overtimeType, {
        params: { userID: userID },
      })
      .then(() => {
        alert('Overtime type deleted successfully!')
        return dispatch(fetchOvertimes(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
