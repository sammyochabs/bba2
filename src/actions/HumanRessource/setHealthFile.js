import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

export const addHealthFile = (data, path) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post(path, data)
      .then(() => {
        alert(' added successfully!')
        // return dispatch(fetchDisciplines(userID));
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
