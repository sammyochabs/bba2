import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CSelect,
  CTabPane,
} from "@coreui/react";
import SettingPageTitle from "src/reusable/SettingPageTitle";

const SpouseViewTab = ({ data }) => {
  return (
    <CTabPane>
      <CCard>
        <CCardHeader>
          <SettingPageTitle title="Spouse" />
        </CCardHeader>
        <CCardBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Spoue Name</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              {data?.spouse_name}
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Nationality</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              {data?.spouse_nationality}
            </CCol>
          </CFormGroup>
          {/*<CFormGroup row>
            <CLabel col md="3" htmlFor="file-input">
              Photo
            </CLabel>
            <CCol xs="12" md="9">
              <CInputFile
                id="file-input"
                name="spouse_photo"
                onChange={handleInput}
              />
            </CCol>
          </CFormGroup>*/}
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">National ID No</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              {data?.spouse_national_id_number}
            </CCol>
          </CFormGroup>
        </CCardBody>
      </CCard>
    </CTabPane>
  );
};

export default SpouseViewTab;
