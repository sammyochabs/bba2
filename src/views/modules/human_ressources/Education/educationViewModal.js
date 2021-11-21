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

const EducationViewModal = ({
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
  const [institutionName, setinstitutionName] = useState('')
  const [principalSubject, setprincipalSubject] = useState('')
  const [degree, setdegree] = useState('')
  const [educationResult, seteducationResult] = useState('')
  const [passingYear, setPassingYear] = useState('')
  const [distinction, setdistinction] = useState('')
  const [response, setResponse] = useState('')
  // console.log("drop",employeedropdown,EmployeeArray)
  useEffect(() => {
    if (type == 'Update') {
      console.log('update call')
      setemployeeName(
        employee && employee.EmployeeID ? employee.EmployeeID : '',
      )
      setinstitutionName(
        employee && employee.InstitutionName ? employee.InstitutionName : '',
      )
      setprincipalSubject(
        employee && employee.principalSubject ? employee.principalSubject : '',
      )
      setdegree(employee && employee.Degree ? employee.Degree : '')
      seteducationResult(
        employee && employee.educationResult ? employee.educationResult : '',
      )
      setPassingYear(
        employee && employee.passingYear ? employee.passingYear : '',
      )
      setdistinction(
        employee && employee.distinction ? employee.distinction : '',
      )
    }
    return () => console.log('unmounting...')
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
                  disabled={isEdiableName}
                >
                  <option value="default" selected>
                    Choose an Employee ...
                  </option>
                  {employeedropdown?.map((el, key) => (
                    <option key={key} value={el.EmployeeID}>
                      {el.Name}
                    </option>
                  ))}
                </CSelect>
                <CLabel htmlFor="nf-institutionName">institution Name</CLabel>
                <CInput
                  type="text"
                  id="nf-institutionName"
                  name="institutionName"
                  placeholder="Enter institution Name"
                  value={institutionName}
                  readOnly
                />
                <CLabel htmlFor="nf-principalSubject">Principal Subject</CLabel>
                <CInput
                  type="text"
                  id="nf-principalSubject"
                  name="principalSubject"
                  placeholder="Enter principal Subject"
                  value={principalSubject}
                  readOnly
                />
                <CLabel htmlFor="nf-degree">Degree/Diploma</CLabel>
                <CInput
                  type="text"
                  id="nf-degree"
                  name="degree"
                  placeholder="Enter degree"
                  value={degree}
                  readOnly
                />
                <CLabel htmlFor="nf-passingYear">Passing Year</CLabel>
                <CInput
                  type="number"
                  id="nf-passingYear"
                  name="passingYear"
                  placeholder="Enter Passing Year"
                  value={passingYear}
                  readOnly
                />
                <CLabel htmlFor="nf-educationResult">Result</CLabel>
                <CInput
                  type="number"
                  id="nf-degree"
                  name="educationResult"
                  placeholder="Enter degree"
                  value={educationResult}
                  readOnly
                />
                <CLabel htmlFor="nf-distinction">Distinction</CLabel>
                <CInput
                  type="text"
                  id="nf-passingYear"
                  name="distinction"
                  placeholder="Enter distinction"
                  value={distinction}
                  readOnly
                />
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EducationViewModal
