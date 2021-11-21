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
import { useDispatch, useSelector } from 'react-redux'
import { checkBeforeUpdate, setActiveOption } from 'src/actions/global'
import { addUser, updateUser } from 'src/actions/users'

const UsersModal = ({ toggle, modal, type, title, userID, selectedItem }) => {
  const [data, setData] = useState({})
  const { roles } = useSelector((state) => state.roles)
  const { employees } = useSelector((state) => state.employees)
  const dispatch = useDispatch()
  var formData = new FormData()

  const renderRoles = roles.map((role, index) => {
    return (
      <option
        key={index}
        value={role.RoleID}
        selected={setActiveOption(role.RoleID, selectedItem?.RoleID)}
      >
        {role.Role}
      </option>
    )
  })
  const renderEmployees = employees.map((employee, index) => {
    return (
      <option
        key={index}
        value={employee.EmployeeID}
        selected={setActiveOption(
          employee.EmployeeID,
          selectedItem?.EmployeeID,
        )}
      >
        {employee.NameEnglish}
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
        debugger
        formData.append('EmployeeID', data.employee)
        formData.append('UserRecordID', data.user_record)
        formData.append('Password', data.password)
        formData.append('RoleID', data.role)
        return data.password !== data.confirm_password
          ? alert('Please make sure both passwords are matched')
          : dispatch(addUser(formData, userID))
        toggle()
        break
      case 'Update':
        formData.append(
          'EmployeeID',
          checkBeforeUpdate(data.employee, selectedItem?.EmployeeID),
        )
        formData.append(
          'UserRecordID',
          checkBeforeUpdate(data.user_record, selectedItem?.EmployeeName),
        )
        formData.append(
          'Password',
          checkBeforeUpdate(data.password, data.password),
        )
        formData.append(
          'RoleID',
          checkBeforeUpdate(data.role, selectedItem?.RoleID),
        )
        dispatch(updateUser(formData, userID))
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
                <CLabel htmlFor="nf-role">Employee</CLabel>
                <CSelect custom name="employee" onChange={handleInput}>
                  {renderEmployees}
                </CSelect>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-username">Username</CLabel>
                <CInput
                  className="col-12"
                  type="text"
                  name="user_record"
                  placeholder="Username"
                  onChange={handleInput}
                  defaultValue={selectedItem?.EmployeeName}
                  required
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-role">Roles</CLabel>
                <CSelect custom name="role" onChange={handleInput}>
                  {renderRoles}
                </CSelect>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-password">Password</CLabel>
                <CInput
                  className="col-12"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInput}
                  defaultValue={data?.password}
                  required
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-password">Confirm Password</CLabel>
                <CInput
                  className="col-12"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={handleInput}
                  defaultValue={data?.confirm_password}
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

export default UsersModal
