import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CRow,
  CTabPane,
} from "@coreui/react";
import SettingPageTitle from "src/reusable/SettingPageTitle";

const EmployeeViewTab = ({ data }) => {
  return (
    <CTabPane>
      <CCard>
        <CCardHeader>
          <SettingPageTitle title="Employee" />
        </CCardHeader>
        <CCardBody>
          <CForm encType="multipart/form-data" className="form-horizontal">
            {/*  */}
            <CFormGroup row>
              <CCol md="10">
                <CRow className="mb-3">
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Registration number</CLabel>
                  </CCol>
                  <CCol xs="12" md="8" style={{ marginLeft: "40px" }}>
                    {data?.employee_registration_number}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Card ID</CLabel>
                  </CCol>
                  <CCol xs="12" md="8" style={{ marginLeft: "40px" }}>
                    {data?.employee_card_id}
                  </CCol>
                </CRow>
              </CCol>

              <CCol md="2" style={{ height: "100px" }}>
                <CCol xs="12" md="12">
                  <div
                    className="custom-file-input-wrapper"
                    style={{ float: "right" }}
                  >
                    <span>Image</span>
                    {data?.employee_photo && (
                      <img
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: "100%",
                        }}
                        src={data?.employee_photo}
                      />
                    )}
                  </div>
                </CCol>
              </CCol>
            </CFormGroup>
            {/*  */}

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Name (English)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.employee_name_english}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Name (Bangla)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.employee_name_bangla}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Father's Name (English)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.employee_fathers_name_english}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Father's Name (Bangla)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.employee_fathers_name_bangla}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Mother's Name (English)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.employee_mothers_name_english}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Mother's Name (Bangla)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.employee_mothers_name_bangla}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Mobile</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.employee_mobile_number}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Date of Birth</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {data?.employee_date_of_birth}
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CTabPane>
  );
};

export default EmployeeViewTab;
