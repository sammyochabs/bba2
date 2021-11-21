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

const AddTraining = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>Training</CCardHeader>

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
                    <CSelect custom name="training_employee" id="select">
                      <option disabled>Please select employee</option>
                      <option value="EM 1">EM 1</option>
                      <option value="EM 2">EM 2</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Local/Foreign</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="training_type" id="select">
                      <option disabled>Please select employee</option>
                      <option value="Local">Local</option>
                      <option value="Foreign">Foreign</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Course/course_title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="text-input"
                      name="training_course_title"
                      placeholder="Course/course_title"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Institution</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="text-input"
                      name="training_institution"
                      placeholder="Institution"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Location</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="text-input"
                      name="training_location"
                      placeholder="Location"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">From</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="date"
                      id="text-input"
                      name="training_date_from"
                      placeholder="From"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">TO</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="date"
                      id="text-date"
                      name="training_date_to"
                      placeholder="To"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Duration</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="text-date"
                      name="training_duration"
                      placeholder="Duration"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Position</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="text-input"
                      name="training_position"
                      placeholder="Position"
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

export default AddTraining;
