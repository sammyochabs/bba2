import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all AcrType
export const getAcrType = (acrType) => {
  return {
    type: 'GET_ACR_TYPE',
    payload: acrType,
  }
}
export const fetchAcrType = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/acrtype/list', { params: { userID: userID } })
      .then((res) => {
        console.log(res)
        const { ACRTypeList } = res.data
        return dispatch(getAcrType(ACRTypeList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new AcrType
export const addAcrType = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/acrtype/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('AcrType added successfully!')
          window.location.reload()
          return dispatch(fetchAcrType(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update AcrType
export const updateAcrType = (newAcrType, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('acrtype/update', newAcrType, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`AcrType updated successfully!`)
          window.location.reload()
          return dispatch(fetchAcrType(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete AcrType
export const deleteAcrType = (acrTypeId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/acrtype/delete', acrTypeId, { params: { userID: userID } })
      .then(() => {
        alert('ACRType deleted successfully!')
        return dispatch(fetchAcrType(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
