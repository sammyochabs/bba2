import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all disciplines
export const getDisciplines = (disciplines) => {
  return {
    type: 'GET_Disciplines',
    payload: disciplines,
  }
}
export const fetchDisciplines = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/discipline/list', {
        params: { userID: localStorage.getItem('userID') },
      })
      .then((res) => {
        const disciplines = res.data.DisciplineList
        return dispatch(getDisciplines(disciplines))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new discipline
export const addDiscipline = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/discipline/add', data, {
        params: { userID: localStorage.getItem('userID') },
      })
      .then(() => {
        alert('Discipline added successfully!')
        return dispatch(fetchDisciplines(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update discipline
export const updateDiscipline = (newDiscipline, userID) => {
  var object = {}
  newDiscipline.forEach(function (value, key) {
    object[key] = value
  })
  var json = JSON.stringify(object)
  console.log('JSONNN', json)

  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('Discipline/Update', newDiscipline)
      .then(() => {
        alert(`Discipline updated successfully!`)
        return dispatch(fetchDisciplines(localStorage.getItem('userID')))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete discipline
export const deleteDiscipline = (disciplineId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('discipline/delete', disciplineId, {
        params: { userID: localStorage.getItem('userID') },
      })
      .then(() => {
        alert('Discipline deleted successfully!')
        return dispatch(fetchDisciplines(localStorage.getItem('userID')))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
