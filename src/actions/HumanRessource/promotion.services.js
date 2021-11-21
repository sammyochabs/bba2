import axios from 'axios'
import apiClient from 'src/services/api'
export const fetchEducationlist = (userID) => {
  return apiClient
    .get('/Promotion/list', {
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data.PromotionList
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
export const fetchDesignationDropdown = (userID) => {
  return apiClient
    .get('/Designation/list', {
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data.DesignationList
    })
    .catch((err) => {
      console.error(err)
    })
}
export const fetchGradeDropdown = (userID) => {
  return apiClient
    .get('/Grade/list', {
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data.GradeList
    })
    .catch((err) => {
      console.error(err)
    })
}
export const deleteEducation = (userID, TrainingID) => {
  let bodyFormData = new FormData()
  bodyFormData.append('userID', userID)
  bodyFormData.append('PromotionID', TrainingID)
  return apiClient
    .post('/Promotion/Delete', bodyFormData)
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      console.error(err)
    })
}
export const AddEducation = (educationFormData) => {
  return apiClient
    .post('/Promotion/add', educationFormData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
export const UpdateEducation = (educationFormData) => {
  return apiClient
    .post('/Promotion/update', educationFormData)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
