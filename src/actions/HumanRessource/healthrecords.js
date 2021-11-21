import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all healthRecords
export const getHealthRecords = (healthRecords) => {
  return {
    type: 'GET_HealthRecords',
    payload: healthRecords,
  }
}
export const fetchHealthRecords = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/health/list', { params: { userID: userID } })
      .then((res) => {
        const healthRecords = res.data.HealthList
        return dispatch(getHealthRecords(healthRecords))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new healthRecord
export const addHealthRecord = (data, userID) => {
  console.log('data', data)
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/health/add', data, { params: { userID: userID } })
      .then(() => {
        alert('HealthRecord added successfully!')
        return dispatch(fetchHealthRecords(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update healthRecord
export const updateHealthRecord = (newHealthRecord, userID) => {
  var object = {}
  newHealthRecord.forEach(function (value, key) {
    object[key] = value
  })
  var json = JSON.stringify(object)
  console.log(json)
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('health/update', newHealthRecord)
      .then(() => {
        alert(`HealthRecord updated successfully!`)
        return dispatch(fetchHealthRecords(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete healthRecord
export const deleteHealthRecord = (healthRecordId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('health/delete', healthRecordId, { params: { userID: userID } })
      .then(() => {
        alert('HealthRecord deleted successfully!')
        return dispatch(fetchHealthRecords(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
