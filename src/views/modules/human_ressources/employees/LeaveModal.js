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
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { addLeaveEmployee } from 'src/actions/HumanRessource/leaves'

const LeavesModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  selectedEmpId,
}) => {
  const [data, setData] = useState({})
  const dispatch = useDispatch()
  var formData = new FormData()

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    return console.log(data)
  }

  const handleSubmit = (e, type) => {
    e.preventDefault()
    switch (type) {
      case 'Add':
        formData.append('reason', data.reason)
        formData.append(
          'dateleave',
          moment(data.dateleave || '').format('DD/MM/YYYY'),
        )
        //formData.append("EmployeeID", selectedEmpId);
        dispatch(addLeaveEmployee(formData, userID, selectedEmpId))
        setData({})
        toggle(null)
        break
      case 'Update':
        formData.append('LeaveID', currentValue)
        formData.append('reason', data.reason)
        formData.append(
          'dateleave',
          moment(data.dateleave || '').format('DD/MM/YYYY'),
        )
        setData({})
        toggle(null)
        break

      default:
        break
    }
  }
  return (
    <CModal
      show={modal}
      onClose={(e) => {
        setData({})
        toggle(e)
      }}
      centered
    >
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <CForm onSubmit={handleSubmit}>
              <CFormGroup>
                <CLabel htmlFor="nf-leave">Leave Reason</CLabel>
                <CInput
                  className="p-0 col-12"
                  type="text"
                  name="reason"
                  onChange={handleInput}
                  value={data?.reason || ''}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-grade">Leave Date</CLabel>
                <CInput
                  className="p-0 col-12"
                  type="date"
                  name="dateleave"
                  onChange={handleInput}
                  value={data?.dateleave || ''}
                  required
                />
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

export default LeavesModal
