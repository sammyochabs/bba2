import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all Departments
export const getDepartments = (departments) => {
  return {
    type: 'GET_DEPARTMENTS',
    payload: departments,
  }
}
export const fetchDepartments = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/departement/list', { params: { userID: userID } })
      .then((res) => {
        const departments = res.data.DepartmentList
        return dispatch(getDepartments(departments))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new Department
export const addDepartment = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/departement/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Department added successfully!')
          window.location.reload()
          return dispatch(fetchDepartments(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update Department
export const updateDepartment = (newDepartment, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('departement/update', newDepartment, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Department updated successfully!`)
          window.location.reload()
          return dispatch(fetchDepartments(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete Department
export const deleteDepartment = (departmentId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/departement/delete', departmentId, { params: { userID: userID } })
      .then(() => {
        alert('Department deleted successfully!')
        return dispatch(fetchDepartments(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
