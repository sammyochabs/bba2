import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all districts
export const getDistricts = (districts) => {
  return {
    type: 'GET_DISTRICTS',
    payload: districts,
  }
}
export const fetchDistricts = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/district/list', { params: { userID: userID } })
      .then((res) => {
        const district = res.data.DistrictList
        return dispatch(getDistricts(district))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new district
export const addDistrict = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/district/add', data, { params: { userID: userID } })
      .then(() => {
        alert('District added successfully!')
        window.location.reload()
        return dispatch(fetchDistricts(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update district
export const updateDistrict = (newDistrict, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('district/update', newDistrict, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`District updated successfully!`)
          window.location.reload()
          return dispatch(fetchDistricts(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete district
export const deleteDistrict = (districtId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('district/delete', districtId, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert('District deleted successfully!')
          return dispatch(fetchDistricts(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
