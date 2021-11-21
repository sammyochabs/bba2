import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";

const AddEducation = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>
              Education
            </CCardHeader>

            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Employee</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="education_employee" id="select">
                      <option disabled>Please select employee</option>
                      <option value="EM 1">EM 1</option>
                      <option value="EM 2">EM 2</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Principal Subject</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="education_subject"
                      placeholder="Principal Subject"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Degree/Diploma</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="education_degree"
                      placeholder="Degree/Diploma"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Passing Year</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="education_passing_year" id="select">
                      <option disabled>Please select passing year</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Result</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="number"
                      id="text-input"
                      name="education_result"
                      placeholder="Result"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Distinction</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="education_distinction"
                      placeholder="Distinction"
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
              <div style={{ float: "right" }}>
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  style={{ margin: 5 }}
                  onClick={() => {}}
                >
                  Save
                </CButton>

                <CButton
                  color="warning"
                  variant="outline"
                  shape="square"
                  size="sm"
                  style={{ margin: 5 }}
                  onClick={() => {}}
                >
                  Reset
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddEducation;
