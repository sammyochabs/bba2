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
import { useDispatch, useSelector } from 'react-redux'
import { checkBeforeUpdate, setActiveOption } from 'src/actions/global'
import { fetchGrades } from 'src/actions/grades'
import {
  addDesignation,
  updateDesignation,
} from '../../../../../actions/designation'

const DesignationModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  selectedItem,
}) => {
  const [data, setData] = useState({})
  const dispatch = useDispatch()
  var formData = new FormData()

  useEffect(() => {
    dispatch(fetchGrades(localStorage.getItem('userID')))
  }, [dispatch])
  const { grades } = useSelector((state) => state.grades)

  const renderGrades = grades.map((grade) => {
    return (
      <option
        key={grade.GRADE_ID}
        value={grade.GRADE_ID}
        selected={setActiveOption(grade.GRADE_ID, selectedItem?.GRADE_ID)}
      >
        {grade.GRADE}
      </option>
    )
  })
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    return console.log(data)
  }

  const handleSubmit = (e, type) => {
    switch (type) {
      case 'Add':
        formData.append('Grade', data.grade)
        formData.append('GradeID', data.grade)
        formData.append('Designation', data.designation)
        dispatch(addDesignation(formData, userID))
        console.log(grades)
        toggle()
        break
      case 'Update':
        formData.append('DesignationID', currentValue)
        formData.append(
          'Designation',
          checkBeforeUpdate(data.designation, selectedItem?.DESIGNATION),
        )
        formData.append(
          'Grade',
          checkBeforeUpdate(data.grade, selectedItem?.GRADE_ID),
        )
        formData.append(
          'GradeID',
          checkBeforeUpdate(data.grade, selectedItem?.GRADE_ID),
        )
        dispatch(updateDesignation(formData, userID))
        toggle()
        break

      default:
        break
    }
  }
  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <CForm onSubmit={handleSubmit}>
              <CFormGroup>
                <div className="label-value">
                  <CLabel htmlFor="nf-grade">Designation title</CLabel>
                  <span>{data.pay_scale_from}</span>
                </div>
                <CInput
                  className="p-0 col-12"
                  type="text"
                  name="designation"
                  onChange={handleInput}
                  defaultValue={selectedItem?.DESIGNATION}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-grade">Grade</CLabel>
                <CSelect custom name="grade" onChange={handleInput}>
                  <option defaultValue value="1">
                    Please select grade
                  </option>
                  {renderGrades}
                </CSelect>
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={(e) => handleSubmit(e, type)}>
          {type}
        </CButton>{' '}
        <CButton color="secondary" onClick={toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DesignationModal
