import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all Overtime
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
      .get('/Overtime/list', { params: { userID: userID } })
      .then((res) => {
        const overtimes = res.data.OvertimeList
        console.log(res.data.OvertimeList)
        return dispatch(getOvertimes(overtimes))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export const getOvertimesType = (overtimes) => {
  return {
    type: 'GET_OVERTIMESTYPE',
    payload: overtimes,
  }
}
export const fetchOvertimesType = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/OvertimeType/list', { params: { userID: userID } })
      .then((res) => {
        const overtimes = res.data.OvertimeTypeList
        console.log(res.data.OvertimeTypeList)
        return dispatch(getOvertimesType(overtimes))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new Overtime
export const addOvertime = (data, userID) => {
  return (dispatch) => {
    for (var [key, value] of data.entries()) {
      console.log(key, value)
    }
    dispatch(fetchGetRequest())
    apiClient
      .post('/overtime/add', data, { 'Content-Type': 'multipart/form-data' })
      .then((response) => {
        console.log(response)
        alert('Overtime added successfully!')
        return dispatch(fetchOvertimes(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update Overtime
export const updateOvertime = (newOvertime, userID) => {
  return (dispatch) => {
    for (var [key, value] of newOvertime.entries()) {
      console.log(key, value)
    }
    dispatch(fetchGetRequest())
    apiClient
      .post('/Overtime/update', newOvertime, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        } else {
          alert(`Overtime type updated successfully!`)
        }

        return dispatch(fetchOvertimes(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export const approveOvertime = (newLeave, userID) => {
  return (dispatch) => {
    for (var [key, value] of newLeave.entries()) {
      console.log(key, value)
    }
    dispatch(fetchGetRequest())
    apiClient
      .post('Overtime/Approve', newLeave, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        } else {
          alert(`Overtime Request approved successfully!`)
        }

        return dispatch(fetchOvertimes(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
export const cancelOvertime = (newLeave, userID) => {
  return (dispatch) => {
    for (var [key, value] of newLeave.entries()) {
      console.log(key, value)
    }
    dispatch(fetchGetRequest())
    apiClient
      .post('Overtime/Cancel', newLeave, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        } else {
          alert(`Overtime Request canceled successfully!`)
        }

        return dispatch(fetchOvertimes(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
export const deleteOvertime = (newLeave, userID) => {
  return (dispatch) => {
    for (var [key, value] of newLeave.entries()) {
      console.log(key, value)
    }
    dispatch(fetchGetRequest())
    apiClient
      .post('Overtime/Delete', newLeave, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        } else {
          alert(`Overtime Request deleted successfully!`)
        }

        return dispatch(fetchOvertimes(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
