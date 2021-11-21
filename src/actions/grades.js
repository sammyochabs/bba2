import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all grades
export const getGrades = (grades) => {
  return {
    type: 'GET_GRADES',
    payload: grades,
  }
}
export const fetchGrades = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/grade/list', { params: { userID: userID } })
      .then((res) => {
        const grades = res.data.GradeList
        return dispatch(getGrades(grades))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new grade
export const addgrade = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/grade/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Grade added successfully!')
          window.location.reload()
          return dispatch(fetchGrades(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update grade
export const updateGrade = (newGrade, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('grade/update', newGrade, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Grade updated successfully!`)
          window.location.reload()
          return dispatch(fetchGrades(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete grade
export const deleteGrade = (gradeId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('grade/delete', gradeId, { params: { userID: userID } })
      .then(() => {
        alert('Grade deleted successfully!')
        return dispatch(fetchGrades(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
