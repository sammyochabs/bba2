import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all punishments
export const getleaves = (empleave) => {
  return {
    type: 'GET_EMPLIST',
    payload: empleave,
  }
}

export const fetchLeave = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/LeaveHR/list', {
        params: { userID: localStorage.getItem('userID') },
      })
      .then((res) => {
        console.log(res)
        const empleave = res.data.LeaveList
        return dispatch(getleaves(empleave))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export const getEmpList = (emplist) => {
  return {
    type: 'GET_EMPLOYEELIST',
    payload: emplist,
  }
}
export const fetchEmpDropdown = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/Employee/Dropdown', {
        params: { userID: localStorage.getItem('userID') },
      })
      .then((res) => {
        console.log(res)
        const emplist = res.data.EmployeeList
        console.log(emplist, 'emplist for action')
        return dispatch(getEmpList(emplist))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// get leave type list

export const getLeaveType = (leavelist) => {
  return {
    type: 'GET_LEAVELIST',
    payload: leavelist,
  }
}
export const fetchLeaveType = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/Leave/List', {
        params: { userID: localStorage.getItem('userID') },
      })
      .then((res) => {
        console.log(res)
        const leavelist = res.data.LeaveList
        console.log(leavelist, 'LeaveList for action')
        return dispatch(getLeaveType(leavelist))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new Emp Loan
export const addEmpLeave = (formData, userID) => {
  return (dispatch) => {
    for (var [key, value] of formData.entries()) {
      console.log(key, value)
    }
    //  dispatch(fetchGetRequest());
    apiClient
      .post('/LeaveHR/Add', formData, { 'Content-Type': 'multipart/form-data' })
      .then((res) => {
        console.log(res.data, 'res.data')
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        }
        if (res.data.status == '200') {
          alert('Employee Leave Request Submitted Successfully!')
        }

        return dispatch(fetchLeave(localStorage.getItem('userID')))
      })
      .catch((err) => {
        console.error(err, 'errrrrr')
      })
  }
}

export const updateEmpLeave = (formData, userID) => {
  return (dispatch) => {
    for (var [key, value] of formData.entries()) {
      console.log(key, value)
    }
    dispatch(fetchGetRequest())
    apiClient
      .post('/LeaveHR/Update', formData, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        console.log(res.data, 'res.data')
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        } else {
          alert('Employee Leave Request Updated Successfully!')
        }

        return dispatch(fetchLeave(localStorage.getItem('userID')))
      })
      .catch((err) => {
        console.error(err, 'errrrrr')
      })
  }
}

export const approveLeave = (newLeave, userID) => {
  return (dispatch) => {
    for (var [key, value] of newLeave.entries()) {
      console.log(key, value)
    }
    dispatch(fetchGetRequest())
    apiClient
      .post('LeaveHR/Approve', newLeave, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        } else {
          alert(`Leave Request approved successfully!`)
        }

        return dispatch(fetchLeave(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export const cancelLeave = (newLeave, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('LeaveHR/Cancel', newLeave, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        } else {
          alert(`Leave Request cancelled successfully!`)
        }

        return dispatch(fetchLeave(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export const deleteLeave = (newLeave, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('LeaveHR/Delete', newLeave, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        if (res.data.status != '200') {
          alert(res.data.status + ' ' + res.data.message)
        } else {
          alert(`Leave deleted successfully!`)
        }

        return dispatch(fetchLeave(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
