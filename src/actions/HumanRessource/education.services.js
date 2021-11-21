import axios from 'axios'
import apiClient from 'src/services/api'
export const fetchEducationlist = (userID) => {
  return apiClient
    .get('/Education/list', {
      params: {
        userID: localStorage.getItem('userID'),
      },
    })
    .then((res) => {
      return res.data.EducationList
    })
    .catch((err) => {
      console.error(err)
    })
}
export const fetchEmployeeDropdown = (userID) => {
  return apiClient
    .get('/Employee/DropDown', {
      params: {
        userID: localStorage.getItem('userID'),
      },
    })
    .then((res) => {
      return res.data.EmployeeList
    })
    .catch((err) => {
      console.error(err)
    })
}
export const deleteEducation = (userID, EducationID) => {
  const FormData = require('form-data')
  let bodyFormData = new FormData()
  bodyFormData.append('userID', localStorage.getItem('userID'))
  bodyFormData.append('EducationID', EducationID)
  return apiClient
    .post('/education/Delete', bodyFormData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
export const AddEducation = (educationFormData) => {
  return apiClient
    .post('/education/add', educationFormData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
export const UpdateEducation = (educationFormData) => {
  return apiClient
    .post('/education/update', educationFormData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
