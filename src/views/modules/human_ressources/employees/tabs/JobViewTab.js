import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CSelect,
  CTabPane,
} from "@coreui/react";
import { useSelector } from "react-redux";
import SettingPageTitle from "src/reusable/SettingPageTitle";

const JobViewTab = ({ data }) => {
  return (
    <CTabPane>
      <CCard>
        <CCardHeader>
          <SettingPageTitle title="Job" />
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Desingation</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.job_designation}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Department</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.job_department}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">Cadre</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.job_cadre}
                <CFormText className="help-block"></CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">Email Adress</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.job_email}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="phone-input">Phone</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.job_phone}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Joining Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.job_joining_date}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">LRP Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.job_lrp_date}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Date of Confirmation</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.job_confirmation_date}
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CTabPane>
  );
};

export default JobViewTab;
