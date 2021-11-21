import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all loanfunds
export const getLoanFunds = (loanFunds) => {
  return {
    type: 'GET_LOAN_FUNDS',
    payload: loanFunds,
  }
}
export const fetchLoanFunds = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/loanfunds/list', { params: { userID: userID } })
      .then((res) => {
        const loanFunds = res.data.loanFundsList
        return dispatch(getLoanFunds(loanFunds))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new loanfund
export const addLoanFund = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/loanfunds/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Loan funds added successfully!')
          window.location.reload()
          return dispatch(fetchLoanFunds(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update loanfund
export const updateLoanFund = (newLoanFund, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('loanfunds/update', newLoanFund, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Loan funds updated successfully!`)
          window.location.reload()
          return dispatch(fetchLoanFunds(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete loanfund
export const deleteLoanFund = (loanFundId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('loanfunds/delete', loanFundId, { params: { userID: userID } })
      .then(() => {
        alert('Loan funds deleted successfully!')
        return dispatch(fetchLoanFunds(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
