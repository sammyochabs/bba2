import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all loantypes
export const getLoanTypes = (loantypes) => {
  return {
    type: 'GET_LOANTYPES',
    payload: loantypes,
  }
}
export const fetchLoanTypes = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    console.log(apiClient)
    apiClient
      .get('/loantype/list', { params: { userID: userID } })
      .then((res) => {
        const loantypes = res.data.loanTypeList
        return dispatch(getLoanTypes(loantypes))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new loantype
export const addLoanType = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/loantype/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Loantype added successfully!')
          window.location.reload()
          return dispatch(fetchLoanTypes(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update loantype
export const updateLoanType = (newLoanType, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('loantype/update', newLoanType, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Loantype updated successfully!`)
          window.location.reload()
          return dispatch(fetchLoanTypes(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete loantype
export const deleteLoanType = (loantypeId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('loantype/delete', loantypeId, { params: { userID: userID } })
      .then(() => {
        alert('Loantype deleted successfully!')
        return dispatch(fetchLoanTypes(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
