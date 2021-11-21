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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CLink,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getFile } from 'src/actions/HumanRessource/downloadFile'
import {
  addHealthRecord,
  updateHealthRecord,
} from 'src/actions/HumanRessource/healthrecords'
import './HealthEditModal.css'
const HealthViewModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  employeeList,
  healthInfoList,
  data,
  setData,
}) => {
  return (
    <CModal show={modal} onClose={toggle} centered size="lg">
      <CModalHeader closeButton>Health View</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Employee</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.EmployeeName}</CLabel>
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Health Information</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.HealthInfo}</CLabel>
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Start Date</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.FromDate}</CLabel>
              </CFormGroup>
            </CCol>
            <CCol sm="4">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">End Date</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.ToDate}</CLabel>
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Height</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.Height}</CLabel>
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Weight</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.Weight}</CLabel>
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Visual power</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.VisualPower}</CLabel>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Blood Pressure</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.BloodPressure}</CLabel>
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Medical Classification</CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">
                  {data?.MedicalClassification}
                </CLabel>
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">
                  Health Weakness/Incompetent Nature
                </CLabel>
                <br />
                <CLabel htmlFor="nfhealthRecord">{data?.HealthWeakness}</CLabel>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">
                  X-ray Report{data?.HealthID ? ' : ' : ''}
                </CLabel>
                <br />
                <CLink
                  onClick={() => {
                    getFile(
                      'HealthID',
                      data?.HealthID,
                      data?.FileXRAY,
                      'Health/GetXRAY',
                    )
                  }}
                >
                  {data?.FileXRAY}
                </CLink>
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">
                  ECG Report{data?.HealthID ? ' : ' : ''}
                </CLabel>
                <br />
                <CLink
                  onClick={() => {
                    getFile(
                      'HealthID',
                      data?.HealthID,
                      data?.FileECG,
                      'Health/GetECG',
                    )
                  }}
                >
                  {data?.FileECG}
                </CLink>
              </CFormGroup>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter></CModalFooter>
    </CModal>
  )
}

export default HealthViewModal
