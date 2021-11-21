import axios from 'axios'
import apiClient from 'src/services/api'
export const fetchEducationlist = (userID) => {
  return apiClient
    .get('/Training/list', {
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data.TrainingList
    })
    .catch((err) => {
      console.error(err)
    })
}
export const fetchEmployeeDropdown = (userID) => {
  return apiClient
    .get('/Employee/DropDown', {
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data.EmployeeList
    })
    .catch((err) => {
      console.error(err)
    })
}
export const deleteEducation = (userID, TrainingID) => {
  const FormData = require('form-data')
  let bodyFormData = new FormData()
  bodyFormData.append('userID', userID)
  bodyFormData.append('TrainingID', TrainingID)
  return apiClient
    .post('/Training/Delete', bodyFormData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
export const AddEducation = (educationFormData) => {
  return apiClient
    .post('/Training/add', educationFormData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
export const UpdateEducation = (educationFormData) => {
  return apiClient
    .post('/Training/update', educationFormData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
