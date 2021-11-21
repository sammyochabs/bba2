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
  CLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
} from '@coreui/react'

import React, { useState } from 'react'
import { getFile } from 'src/actions/HumanRessource/downloadFile'
const DisciplineViewModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  employeeList,
  punishmentList,
  data,
  setData,
}) => {
  return (
    <CModal show={modal} onClose={toggle} size="lg" centered>
      <CModalHeader closeButton>Discipline View</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm="4">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Employee</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.EmployeeName}</CLabel>
              </CFormGroup>
            </CCol>

            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Description Of Offence</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">
                  {data?.OffenceDescription}
                </CLabel>
              </CFormGroup>
            </CCol>
          </CRow>

          <CCard>
            <CCardHeader>Punishment</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">Name Of Punishment</CLabel>
                    <br />
                    <CLabel htmlFor="nfhealthRecord">
                      {data?.PunishmentName}
                    </CLabel>
                  </CFormGroup>
                </CCol>
                <CCol sm="4">
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">
                      {' '}
                      Type Of Punishment
                    </CLabel>
                    <br />
                    <CLabel htmlFor="nfhealthRecord">
                      {data?.PunishmentID}
                    </CLabel>
                  </CFormGroup>
                </CCol>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">Punishment Memo No</CLabel>
                    <br />
                    <CLabel htmlFor="nfhealthRecord">
                      {data?.PunishmentMemoN}
                    </CLabel>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">
                      Punishment Memo Date
                    </CLabel>
                    <br />
                    <CLabel htmlFor="nfhealthRecord">
                      {data?.PunishmentMemoDate}
                    </CLabel>
                  </CFormGroup>
                </CCol>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">
                      Punishment Memo Scan{' '}
                    </CLabel>
                    <br />
                    <CLink
                      onClick={() => {
                        getFile(
                          'DisciplineID',
                          data?.DisciplineID,
                          data?.PunishmentMemoFile,
                          'Discipline/GetPunishmentFile',
                        )
                      }}
                    >
                      {data?.PunishmentMemoFile}
                    </CLink>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CRow>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Appeal</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.Appeal}</CLabel>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">
                      Release From Charge
                    </CLabel>
                  </CFormGroup>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="nfhealthRecord">Memo No</CLabel>
                        <br />
                        <CLabel htmlFor="nfhealthRecord">
                          {data?.ReleaseMemoN}
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="nfhealthRecord">Memo Date</CLabel>
                        <br />
                        <CLabel htmlFor="nfhealthRecord">
                          {data?.ReleaseMemoDate}
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="nfhealthRecord">Memo Scan </CLabel>
                        <br />
                        <CLink
                          onClick={() => {
                            getFile(
                              'DisciplineID',
                              data?.DisciplineID,
                              data?.ReleaseMemoFile,
                              'Discipline/GetPunishmentFile',
                            )
                          }}
                        >
                          {data?.ReleaseMemoFile}
                        </CLink>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter></CModalFooter>
    </CModal>
  )
}

export default DisciplineViewModal
