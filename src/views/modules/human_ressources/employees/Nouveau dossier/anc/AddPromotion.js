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

const AddPromotion = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>
              Promotion/Change
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
                    <CSelect custom name="promotion_employee" id="select">
                      <option disabled>Please select employee</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Type</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="promotion_type" id="select">
                      <option disabled>Please select type</option>
                      <option value="Promotion">Promotion</option>
                      <option value="Charge">Charge</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Post/Designation</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="text-input"
                      name="promotion_post"
                      placeholder="Post/Designation"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Organization</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="text-input"
                      name="promotion_organization"
                      placeholder="Organization"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Type of posting</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="promotion_post_type" id="select">
                      <option disabled>Please select type of posting</option>
                      <option value="Regular">Regular</option>
                      <option value="Deputation">Deputation</option>
                      <option value="Lien">Lien</option>
                      <option value="OSD">OSD</option>
                      <option value="Others">Others</option>
                    </CSelect>
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
                      name="promotion_location"
                      placeholder="Location"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Grade/Payscale</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="promotion_grade" id="select">
                      <option disabled>Please select grade</option>
                      <option value="G1">G1</option>
                      <option value="G2">G2</option>
                    </CSelect>
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

export default AddPromotion;
