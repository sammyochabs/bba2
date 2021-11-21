import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSelect,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ErrorMessage from 'src/actions/errorMessages'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const TrainerViewModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  employee,
  employeedropdown,
  isEdiableName,
  reInitalizeList,

  responseModal,
  setResponseModal,
}) => {
  const [employeeName, setemployeeName] = useState('')
  const [CourseTitle, setCourseTitle] = useState('')
  const [LocalORForeign, setLocalORForeign] = useState('')
  const [Institution, setInstitution] = useState('')
  const [Location, setLocation] = useState('')
  const [FromDate, setFromDate] = useState(new Date())
  const [ToDate, setToDate] = useState(new Date())
  const [Duration, setDuration] = useState('')
  const [Position, setPosition] = useState('')
  const [response, setResponse] = useState('')

  const changeDateFormat = (dateObj) => {
    if (!dateObj) return
    try {
      let month = dateObj.getMonth() + 1 //months from 1-12
      let day = dateObj.getDate()
      let year = dateObj.getFullYear()
      if (day < 10) day = '0' + day
      if (month < 10) month = '0' + month
      return day + '/' + month + '/' + year
    } catch (error) {
      console.log('Date Error', error)
      return error
    }
  }

  const _changeDateFormat = (date) => {
    if (typeof date != 'string') {
      return (
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)) +
        '/' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
        '/' +
        date.getFullYear()
      )
    }
    let splitDate = date.split('/')
    let dateObj = new Date(
      splitDate[1] + '-' + splitDate[0] + '-' + splitDate[2],
    )
    let month = dateObj.getMonth() + 1 //months from 1-12
    let day = dateObj.getDate()
    let year = dateObj.getFullYear()
    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month
    return new Date(month + '/' + day + '/' + year)
  }

  useEffect(() => {
    if (type == 'Update') {
      // let _employe = employeedropdown.filter(el => el.EmployeeID == employee.EmployeeID)
      // console.log("update call",_employe)
      setemployeeName(
        employee && employee.EmployeeName ? employee.EmployeeName : '',
      )
      setCourseTitle(
        employee && employee.CourseTitle ? employee.CourseTitle : '',
      )
      setLocalORForeign(
        employee && employee.TrainingType ? employee.TrainingType : '',
      )
      setInstitution(
        employee && employee.Institution ? employee.Institution : '',
      )
      setLocation(employee && employee.Location ? employee.Location : '')
      setFromDate(
        employee && employee.FromDate
          ? _changeDateFormat(employee.FromDate)
          : '',
      )
      setToDate(
        employee && employee.ToDate ? _changeDateFormat(employee.ToDate) : '',
      )
      setDuration(employee && employee.Duration ? employee.Duration : '')
      setPosition(employee && employee.Position ? employee.Position : '')
      setResponseModal(false)
    }
    return () => {
      console.log('unmounting...')
      // document.getElementById("nf-ToDate").value  = new Date()
    }
  }, [employee])

  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <CForm>
              <CFormGroup>
                <CLabel htmlFor="ccmonth">Employee</CLabel>
                <CSelect
                  custom
                  name="ccmonth"
                  id="ccmonth"
                  value={employeeName}
                  disabled={true}
                >
                  <option value="default" selected>
                    Choose an Employee...
                  </option>
                  {employeedropdown.map((el, key) => {
                    if (el.Name == employeeName)
                      return (
                        <option key={key} value={employeeName}>
                          {employeeName}
                        </option>
                      )
                    else
                      return (
                        <option key={key} value={el.EmployeeID}>
                          {el.Name}
                        </option>
                      )
                  })}
                </CSelect>
                <CLabel htmlFor="nf-Position">Local/Foreign</CLabel>
                <CSelect
                  custom
                  name="ccmonth"
                  id="ccmonth"
                  value={LocalORForeign}
                  disabled={true}
                >
                  <option value="default" selected>
                    Choose a Type
                  </option>
                  <option value="Local">Local</option>
                  <option value="Foreign">Foreign</option>
                </CSelect>
                <CLabel htmlFor="nf-CourseTitle">Course Title</CLabel>
                <CInput
                  type="text"
                  id="nf-CourseTitle"
                  name="CourseTitle"
                  placeholder="Enter Course Title"
                  value={CourseTitle}
                  readOnly
                />
                <CLabel htmlFor="nf-Institution">Institution</CLabel>
                <CInput
                  type="text"
                  id="nf-Institution"
                  name="Institution"
                  placeholder="Enter Institution"
                  value={Institution}
                  readOnly
                />
                <CLabel htmlFor="nf-Location">Location</CLabel>
                <CInput
                  type="text"
                  id="nf-Location"
                  name="Location"
                  placeholder="Enter Location"
                  value={Location}
                  readOnly
                />

                <CLabel htmlFor="nf-FromDate">From Date</CLabel>
                <DatePicker
                  class="form-control"
                  selected={FromDate}
                  dateFormat="dd/MM/yyyy"
                  readOnly
                />

                <CLabel htmlFor="nf-ToDate">To Date</CLabel>
                <DatePicker
                  class="form-control"
                  selected={ToDate}
                  dateFormat="dd/MM/yyyy"
                  readOnly
                />

                <CLabel htmlFor="nf-Duration">Duration</CLabel>
                <CInput
                  type="text"
                  id="nf-Duration"
                  name="Duration"
                  placeholder="Enter Duration"
                  value={Duration}
                  readOnly
                />
                <CLabel htmlFor="nf-Position">Position</CLabel>
                <CInput
                  type="text"
                  id="nf-Position"
                  name="Position"
                  placeholder="Enter Location"
                  value={Position}
                  readOnly
                />
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
        <CModalFooter>
          <CButton color="secondary" onClick={toggle}>
            Close
          </CButton>
        </CModalFooter>
      </CModalBody>
    </CModal>
  )
}

export default TrainerViewModal
