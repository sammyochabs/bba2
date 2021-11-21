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
import {
  AddEducation,
  UpdateEducation,
} from 'src/actions/HumanRessource/promotion.services'
import DatePicker from 'react-datepicker'
import ErrorMessage from 'src/actions/errorMessages'

import 'react-datepicker/dist/react-datepicker.css'
const PromotionViewModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  employee,
  employeedropdown,
  isEdiableName,
  desginationdropdown,
  gradedropdown,
  employeeName,
  setemployeeName,
  Type,
  setType,
  designation,
  setdesignation,
  organization,
  setOrganization,
  postingType,
  setPostingType,
  Location,
  setLocation,
  FromDate,
  setFromDate,
  ToDate,
  setToDate,
  promotionDate,
  setPromotionDate,
  GradeORPayscale,
  setGradeORPayscale,
  Grade,
  setGrade,

  responseModal,
  setResponseModal,
  reInitalizeList,
}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [response, setResponse] = useState('')

  const [modalopen, setmodalopen] = useState(false)

  // const [employeeName, setemployeeName] = useState("");
  // const [Type, setType] = useState("");
  // const [designation, setdesignation] = useState("");
  // const [organization, setOrganization] = useState("");
  // const [postingType, setPostingType] = useState("");
  // const [Location, setLocation] = useState("");
  // const [FromDate, setFromDate] = useState("");
  // const [ToDate, setToDate] = useState("");
  // const [promotionDate, setPromotionDate] = useState("");
  // const [GradeORPayscale, setGradeORPayscale] = useState("");
  // const [Grade, setGrade] = useState("");
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
      setemployeeName(
        employee && employee.EmployeeID ? employee.EmployeeID : '',
      )
      setType(employee && employee.PromotionType ? employee.PromotionType : '')
      setdesignation(
        employee && employee.Designation ? employee.Designation : '',
      )
      setOrganization(
        employee && employee.Organization ? employee.Organization : '',
      )
      setPostingType(
        employee && employee.PostingType ? employee.PostingType : '',
      )
      setLocation(employee && employee.Location ? employee.Location : '')
      setFromDate(
        employee && employee.DateFrom
          ? _changeDateFormat(employee.DateFrom)
          : '',
      )
      setToDate(
        employee && employee.DateTo ? _changeDateFormat(employee.DateTo) : '',
      )
      setPromotionDate(
        employee && employee.PromotionDate
          ? _changeDateFormat(employee.PromotionDate)
          : '',
      )
      setGradeORPayscale(employee && employee.Duration ? employee.Duration : '')
      setResponseModal(false)
    }
    return () => {
      console.log('unmounting...', employeeName)
    }
  }, [employee])

  const clearState = () => {
    setdesignation('')
    setGrade('')
    setGradeORPayscale('')
  }

  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <CForm id="create-course-form">
              <CFormGroup>
                <CLabel htmlFor="ccmonth" onClick={clearState}>
                  Employee
                </CLabel>
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
                <CLabel htmlFor="nf-Position">Type</CLabel>
                <CSelect
                  custom
                  name="ccmonth"
                  id="ccmonth"
                  value={Type}
                  disabled={true}
                >
                  <option value="default" selected>
                    Choose a type...
                  </option>
                  <option value="Promotion">Promotion</option>
                  <option value="Charge">Charge</option>
                </CSelect>
                <CLabel htmlFor="nf-Position">Designation</CLabel>
                <CSelect custom name="ccmonth" id="ccmonth" disabled={true}>
                  <option value="default" selected>
                    Choose a selection ...
                  </option>
                  {desginationdropdown.map((el, key) => (
                    <option key={key} value={key}>
                      {el.DESIGNATION}
                    </option>
                  ))}
                </CSelect>
                <CLabel htmlFor="nf-Grade">Grade</CLabel>
                <CInput
                  type="text"
                  id="nf-Grade"
                  name="Grade"
                  value={Grade}
                  readOnly
                />
                <CLabel htmlFor="nf-Duration">Payscale</CLabel>
                <CInput
                  type="text"
                  id="nf-GradeORPayscale"
                  name="GradeORPayscale"
                  value={GradeORPayscale}
                  readOnly
                />
                <CLabel htmlFor="nf-organization">Organization</CLabel>
                <CInput
                  type="text"
                  id="nf-organization"
                  name="organization"
                  placeholder="Enter organization"
                  value={organization}
                  readOnly
                />
                <CLabel htmlFor="nf-postingType">PostingType</CLabel>
                <CSelect
                  custom
                  name="postingType"
                  id="postingType"
                  value={postingType}
                  disabled={true}
                >
                  <option value="default" selected>
                    Choose a type...
                  </option>
                  <option value="Regular">Regular</option>
                  <option value="Deputation">Deputation</option>
                  <option value="Lien">Lien</option>
                  <option value="Others">Others</option>
                </CSelect>
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
                  readOnly
                  dateFormat="dd/MM/yyyy"
                />
                <CLabel htmlFor="nf-ToDate">To Date</CLabel>
                <DatePicker
                  class="form-control"
                  selected={ToDate}
                  readOnly
                  dateFormat="dd/MM/yyyy"
                />
                <CLabel htmlFor="nf-promotionDate">Promotion Date</CLabel>
                <DatePicker
                  class="form-control"
                  selected={promotionDate}
                  readOnly
                  dateFormat="dd/MM/yyyy"
                />
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
        <ErrorMessage modal={responseModal} responseCode={response} />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default PromotionViewModal
