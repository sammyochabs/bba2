import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CLabel,
  CDataTable,
  CTabPane,
  CCol,
  CInputFile,
  CInput,
  CSelect,
  CFormGroup,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { addChild, deleteChild } from 'src/actions/children'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import { getChildFile } from 'src/actions/employee'
import { fetchChildren } from './../../../../../actions/children'

const ChildrenTab = ({
  handleInput,
  handleFile,
  data,
  employeeId: empId,
  view,
}) => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  const formData = new FormData()
  const employeeId = useSelector((state) => state.employees.employeeId) || empId
  const { children } = useSelector((state) => state.children)
  useEffect(() => {
    dispatch(fetchChildren(employeeId, userID))
  }, [dispatch])

  const handleDelete = (id, employeeId, userID) => {
    formData.append('ChildID', id)
    dispatch(deleteChild(formData, employeeId, userID))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // children
    formData.append('EmployeeID', employeeId)
    formData.append('Name', data.children_name)
    formData.append(
      'BirthDate',
      moment(data.children_date_of_birth).format('DD/MM/YYYY'),
    )
    formData.append('Gender', data.children_gender)
    formData.append('School', data.children_school)
    formData.append('Class', data.children_class)
    formData.append('Certificate', data.children_certificate_file)
    formData.append('Photo', data.children_photo_file)
    // Files
    //formData.append("Photo", data.children_photo);
    //formData.append("Certificate", data.children_certificate);
    return !employeeId
      ? alert('Please add an employee first.')
      : dispatch(addChild(formData, employeeId, userID))
  }
  const fields = [
    { key: 'Name' },
    { key: 'Gender' },
    { key: 'BirthDate' },
    { key: 'School' },
    { key: 'Class' },
    { key: 'Photo' },
    { key: 'Certificate' },
    { key: 'Action' },
  ]
  if (view)
    return (
      <CTabPane>
        <CCard>
          <CCardHeader>
            <CLabel>
              <SettingPageTitle title="Children" />
            </CLabel>
          </CCardHeader>
          <CRow>
            <CCol md="12">
              <CDataTable
                items={children}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  Certificate: (item) => {
                    return (
                      <td>
                        <CLink
                          onClick={() => {
                            getChildFile(
                              'ChildID',
                              item.ChildID,
                              item.Certificate,
                              'Child/GetCertificate',
                            )
                          }}
                        >
                          {item.Photo || ''}
                        </CLink>
                      </td>
                    )
                  },
                  Action: (item) => {
                    return (
                      <td className="py-2">
                        <CDropdown className="m-1">
                          <CDropdownToggle>
                            <CIcon name={'cilSettings'} size={'lg'} />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>Edit</CDropdownItem>
                            <CDropdownItem
                              onClick={() => {
                                handleDelete(item.ChildID, employeeId, userID)
                              }}
                            >
                              Delete
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </td>
                    )
                  },
                }}
              />
            </CCol>
          </CRow>
        </CCard>
      </CTabPane>
    )
  return (
    <CTabPane>
      <CCard>
        <CCardHeader>
          <CLabel>
            <SettingPageTitle title="Children" />
          </CLabel>
          <CButton
            color="info"
            size="lg"
            onClick={(e) => {
              handleSubmit(e)
            }}
            style={{ float: 'right' }}
          >
            + Save Child
          </CButton>
        </CCardHeader>

        <CCardBody>
          <CRow>
            <CCol md="5">
              <form
                onSubmit={(e) => {
                  handleSubmit(e)
                }}
              >
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel htmlFor="text-input">Name</CLabel>
                    <CInput
                      onChange={handleInput}
                      id="text-input"
                      name="children_name"
                      placeholder="Name"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="text-input">Date of birth</CLabel>
                    <CInput
                      onChange={handleInput}
                      type="date"
                      id="text-input"
                      name="children_date_of_birth"
                    />
                  </CCol>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="text-input">Gender</CLabel>
                    <CSelect
                      custom
                      name="children_gender"
                      id="select"
                      onChange={handleInput}
                    >
                      <option>Please select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="6">
                    <CLabel htmlFor="text-input">School</CLabel>
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="text-input"
                      name="children_school"
                      placeholder="School"
                    />
                  </CCol>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="text-input">Class</CLabel>
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="text-input"
                      name="children_class"
                      placeholder="Class"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3"></CCol>
                  <CCol xs="12" md="9"></CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="file-input">Certificate</CLabel>
                    <CInputFile
                      id="file-input"
                      name="children_certificate"
                      onChange={handleFile}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel htmlFor="file-input">
                      Photo
                      <CInputFile
                        id="file-input"
                        name="children_photo"
                        onChange={handleFile}
                      />
                    </CLabel>
                  </CCol>
                </CFormGroup>
              </form>
            </CCol>
            <CCol md="7">
              <CDataTable
                items={children}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  Photo: (item) => {
                    return (
                      <td>
                        <CLink
                          onClick={() => {
                            getChildFile(
                              'ChildID',
                              item.ChildID,
                              item.Photo,
                              'Child/GetPhoto',
                            )
                          }}
                        >
                          {item.Photo}
                        </CLink>
                      </td>
                    )
                  },

                  Certificate: (item) => {
                    return (
                      <td>
                        <CLink
                          onClick={() => {
                            getChildFile(
                              'ChildID',
                              item.ChildID,
                              item.Certificate,
                              'Child/GetCertificate',
                            )
                          }}
                        >
                          {item.Certificate || ''}
                        </CLink>
                      </td>
                    )
                  },
                  Action: (item) => {
                    return (
                      <td className="py-2">
                        <CDropdown className="m-1">
                          <CDropdownToggle>
                            <CIcon name={'cilSettings'} size={'lg'} />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>Edit</CDropdownItem>
                            <CDropdownItem
                              onClick={() => {
                                handleDelete(item.ChildID, employeeId, userID)
                              }}
                            >
                              Delete
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </td>
                    )
                  },
                }}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CTabPane>
  )
}

export default ChildrenTab
