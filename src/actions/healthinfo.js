import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all health infos
export const getHealthInfos = (healthInfos) => {
  return {
    type: 'GET_HEALTH_INFO',
    payload: healthInfos,
  }
}
export const fetchHealthInfos = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/healthinfo/list', { params: { userID: userID } })
      .then((res) => {
        const { HealthInfoList } = res.data
        return dispatch(getHealthInfos(HealthInfoList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new health infos
export const addHealthInfo = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/healthinfo/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Health infos added successfully!')
          window.location.reload()
          return dispatch(fetchHealthInfos(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update health infos
export const updateHealthInfo = (newHealthInfos, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/healthinfo/update', newHealthInfos, {
        params: { userID: userID },
      })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Health infos updated successfully!`)
          window.location.reload()
          return dispatch(fetchHealthInfos(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete health infos
export const deleteHealthInfo = (healthInfoId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/healthinfo/delete', healthInfoId, { params: { userID: userID } })
      .then(() => {
        alert('Health info deleted successfully!')
        return dispatch(fetchHealthInfos(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
