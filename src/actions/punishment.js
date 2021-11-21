import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all punishments
export const getPunishments = (punishments) => {
  return {
    type: 'GET_PUNISHMENTS',
    payload: punishments,
  }
}
export const fetchPunishments = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/punishmentType/list', { params: { userID: userID } })
      .then((res) => {
        console.log(res)
        const punishments = res.data.PunishmentTypeList
        return dispatch(getPunishments(punishments))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new punishment
export const addPunishment = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/punishmentType/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Punishment added successfully!')
          window.location.reload()
          return dispatch(fetchPunishments(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update punishment
export const updatePunishment = (newPunishment, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('punishmentType/update', newPunishment, {
        params: { userID: userID },
      })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
          console.log(res.data)
        } else {
          alert(`Punishment updated successfully!`)
          window.location.reload()
          return dispatch(fetchPunishments(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete punishment
export const deletePunishment = (punishmentId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('punishmentType/delete', punishmentId, {
        params: { userID: userID },
      })
      .then(() => {
        alert('Punishment deleted successfully!')
        return dispatch(fetchPunishments(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
