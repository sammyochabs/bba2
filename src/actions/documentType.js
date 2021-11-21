import apiClient from 'src/services/api'

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: 'FETCH_GET_REQUEST',
  }
}

// fetch all document type
export const getDocumentType = (doctype) => {
  return {
    type: 'GET_DOCUMENT_TYPE',
    payload: doctype,
  }
}
export const fetchDocumentType = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .get('/documenttype/list', { params: { userID: userID } })
      .then((res) => {
        const { DocumentTypeList } = res.data
        return dispatch(getDocumentType(DocumentTypeList))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// add new document type
export const addDocumentType = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/documenttype/add', data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== '200') {
          alert('Please make sure all fields are filled')
        } else {
          alert('Document type added successfully!')
          window.location.reload()
          return dispatch(fetchDocumentType(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// update document type
export const updateDocumentType = (newDocumentType, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/documenttype/update', newDocumentType, {
        params: { userID: userID },
      })
      .then((res) => {
        if (res.data.status !== '200')
          alert('Please make sure all fields are filled')
        else {
          alert(`Document type updated successfully!`)
          window.location.reload()
          return dispatch(fetchDocumentType(userID))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// delete document type
export const deleteDocumentType = (documentTypeId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest())
    apiClient
      .post('/documenttype/delete', documentTypeId, {
        params: { userID: userID },
      })
      .then(() => {
        alert('DocumentTypeId deleted successfully!')
        return dispatch(fetchDocumentType(userID))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
