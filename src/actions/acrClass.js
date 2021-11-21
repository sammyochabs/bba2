import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all AcrClasses
export const getAcrClasses = (acrClasses) => {
  return {
    type: 'GET_ACR_CLASSES',
    payload: acrClasses,
  }
}
export const fetchAcrClasses = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/acrclass/list', { params: { userID: userID } })
      .then((res) => {
        const { ACRClassList } = res.data
        return dispatch(getAcrClasses(ACRClassList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new AcrClass
export const addAcrClass = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/acrclass/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('ACRClass added successfully!')
          window.location.reload()
          return dispatch(fetchAcrClasses(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update AcrClass
export const updateAcrClass = (newAcrClass, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('acrclass/update', newAcrClass, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`ACRClass updated successfully!`)
          window.location.reload()
          return dispatch(fetchAcrClasses(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete AcrClass
export const deleteAcrClass = (acrClassId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/acrclass/delete', acrClassId, { params: { userID: userID } })
      .then(() => {
        alert('ACRClass deleted successfully!')
        return dispatch(fetchAcrClasses(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
