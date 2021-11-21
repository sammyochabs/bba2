import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CTabPane,
} from '@coreui/react'
import SettingPageTitle from 'src/reusable/SettingPageTitle'

const GeneralViewTab = ({ data }) => {
  return (
    <CTabPane>
      <CCard>
        <CCardHeader>
          <SettingPageTitle title="General" />
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Employee Blood</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.general_employee_blood}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Religion</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.general_employee_religion}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Gender</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.general_employee_gender}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Freedom Fighter</CLabel>
                <CInput
                  type="checkbox"
                  className="col-md-1"
                  name="general_employee_freedom_fighter"
                  checked={data?.general_employee_freedom_fighter}
                  disabled
                  //readOnly
                />
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="select">
                  Child/Grandchild of Freedom fighter
                </CLabel>
                <CInput
                  type="checkbox"
                  className="col-md-1"
                  name="general_employee_children_freedom_fighter"
                  checked={data?.general_employee_children_freedom_fighter}
                  disabled
                  //readOnly
                />
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="select">Tribal</CLabel>
                <CInput
                  type="checkbox"
                  className="col-md-1"
                  name="general_employee_tribal"
                  checked={data?.general_employee_tribal}
                  disabled
                  //readOnly
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Nationality </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.general_employee_nationality}
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CTabPane>
  )
}
export default GeneralViewTab
