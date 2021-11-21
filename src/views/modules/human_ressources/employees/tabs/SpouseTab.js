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

const SpouseTab = ({ handleInput, data, handleFile }) => {
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
              <CInput
                onChange={handleFile}
                id="text-input"
                name="spouse_name"
                value={data?.spouse_name}
                placeholder="Spoue Name"
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Nationality</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect
                onChange={handleInput}
                custom
                name="spouse_nationality"
                value={data?.spouse_nationality}
                id="select"
              >
                <option>Please select nationality</option>
                <option value="Bangladeshi">Bangladeshi</option>
                <option value="Others">Others</option>
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
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
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">National ID No</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                onChange={handleInput}
                id="text-input"
                type="number"
                name="spouse_national_id_number"
                value={data?.spouse_national_id_number}
                placeholder="National ID No"
              />
            </CCol>
          </CFormGroup>
        </CCardBody>
      </CCard>
    </CTabPane>
  );
};

export default SpouseTab;
