import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CLabel,
  CLink,
  CRow,
  CSelect,
  CTabPane,
} from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDocumentType } from 'src/actions/documentType'
import {
  addEmployeeDocument,
  deleteEmployeeDocument,
  getFile,
} from 'src/actions/employee'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import { fetchDocs } from './../../../../../actions/employee'

const DocsTab = ({
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
  useEffect(() => {
    dispatch(fetchDocumentType(userID))
    dispatch(fetchDocs(employeeId))
  }, [dispatch])
  const { documentTypes } = useSelector((state) => state.documentTypes)
  const { employeeDocs } = useSelector((state) => state.employees)

  const handleDelete = (id, employeeId, userID) => {
    formData.append('documentID', id)
    return dispatch(deleteEmployeeDocument(formData, employeeId, userID))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    formData.append('EmployeeID', employeeId)
    formData.append('DocumentTypeID', data.employee_document_type)
    formData.append('Memo', data.employee_document_memo)
    formData.append('File', data.employee_document_file_file)
    console.log(formData.get('EmployeeID'))
    console.log(formData.get('DocumentTypeID'))
    console.log(formData.get('Memo'))
    console.log(formData.get('File'))
    return !employeeId
      ? alert('Please add an employee first.')
      : dispatch(addEmployeeDocument(formData, employeeId, userID))
  }

  const renderDocs = documentTypes.map((doc) => {
    return (
      <option key={doc.DocumentTypeID} value={doc.DocumentTypeID}>
        {doc.DocumentType}
      </option>
    )
  })
  const fieldsDocs = [
    { key: 'DocID' },
    { key: 'DocumentType' },
    { key: 'FileName' },
    { key: 'CreationDate' },
    { key: 'MEMO' },
    'action',
  ]
  if (view)
    return (
      <CTabPane>
        <CCard>
          <CCardHeader>
            <CLabel>
              <SettingPageTitle title="Documents" />
            </CLabel>
          </CCardHeader>
          <CDataTable
            items={employeeDocs}
            fields={fieldsDocs}
            itemsPerPage={5}
            pagination
            scopedSlots={{
              FileName: (item) => {
                return (
                  <CLink
                    onClick={() => {
                      getFile(
                        'documentID',
                        item.DocID,
                        item.FileName,
                        'EmployeeDocument/GetDoc',
                      )
                    }}
                  >
                    {item.FileName}
                  </CLink>
                )
              },
              action: (item) => (
                <td>
                  <CButton
                    color="danger"
                    size="md"
                    onClick={() => {
                      if (window.confirm('are you sure!'))
                        handleDelete(item.DocID, employeeId, userID)
                    }}
                    style={{ margin: 2 }}
                  >
                    Delete
                  </CButton>
                </td>
              ),
            }}
          />
        </CCard>
      </CTabPane>
    )
  return (
    <CTabPane>
      <CCard>
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <CCardHeader>
            <CLabel>
              <SettingPageTitle title="Documents" />
            </CLabel>
            <CButton
              onClick={(e) => {
                handleSubmit(e)
              }}
              color="info"
              size="lg"
              style={{ float: 'right' }}
            >
              + Save Document
            </CButton>
          </CCardHeader>
          <CFormGroup row className="col-md-6 mt-3">
            <CCol md="12">
              <CLabel htmlFor="text-input">Memo</CLabel>
              <CInput
                type="text"
                onChange={handleInput}
                id="text-input"
                name="employee_document_memo"
                placeholder="Name"
              />
            </CCol>
            <CRow className="col-md-12 mt-3">
              <CCol xs="12" md="6">
                <CLabel htmlFor="text-input">Document type</CLabel>
                <CSelect
                  custom
                  name="employee_document_type"
                  id="select"
                  onChange={handleInput}
                >
                  <option>Please select document type</option>
                  {renderDocs}
                </CSelect>
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="text-input">Upload document</CLabel>
                <CInput
                  type="file"
                  onChange={handleFile}
                  id="text-input"
                  name="employee_document_file"
                />
              </CCol>
            </CRow>
          </CFormGroup>
        </form>

        <CCardBody>
          <CDataTable
            items={employeeDocs}
            fields={fieldsDocs}
            itemsPerPage={5}
            pagination
            scopedSlots={{
              FileName: (item) => {
                return (
                  <CLink
                    onClick={() => {
                      getFile(
                        'documentID',
                        item.DocID,
                        item.FileName,
                        'EmployeeDocument/GetDoc',
                      )
                    }}
                  >
                    {item.FileName}
                  </CLink>
                )
              },
              action: (item) => (
                <td>
                  <CButton
                    color="danger"
                    size="md"
                    onClick={() => {
                      if (window.confirm('are you sure!'))
                        handleDelete(item.DocID, employeeId, userID)
                    }}
                    style={{ margin: 2 }}
                  >
                    Delete
                  </CButton>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </CTabPane>
  )
}

export default DocsTab
