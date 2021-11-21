import apiClient from 'src/services/api'

export const getEmployeeList = (onEmployeeListResult) => {
  apiClient
    .get('/employee/dropdown', {
      params: { userID: localStorage.getItem('userID') },
    })
    .then((res) => {
      const employeeList = res.data.EmployeeList
      onEmployeeListResult(employeeList)
    })
    .catch((err) => {
      console.error(err)
    })
}
