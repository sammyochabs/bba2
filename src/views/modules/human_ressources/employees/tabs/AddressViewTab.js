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
  CRow,
  CSelect,
  CTabPane,
} from "@coreui/react";
import { useSelector } from "react-redux";
import SettingPageTitle from "src/reusable/SettingPageTitle";

const AdressViewTab = ({ data }) => {
  return (
    <CTabPane>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              <SettingPageTitle title="Present Adress" />
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Village/House N°. Road</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.present_adress_village_house}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Post Office</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.present_adress_post_office}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Upazila</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.present_adress_upazila}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">District</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.present_adress_district}
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              <SettingPageTitle title="Permanent Adress" />
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Village/House N°. Road</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.permanent_adress_village_house}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Post Office</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.permanent_adress_post_office}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Upazila</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.permanent_adress_upazila}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">District</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.permanent_adress_district}
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              <SettingPageTitle title="Official Adress" />
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Village/House N°. Road</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.official_adress_village_house}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Post Office</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.official_adress_post_office}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Upazila</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.official_adress_upazila}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">District</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {data?.official_adress_district}
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CTabPane>
  );
};

export default AdressViewTab;
