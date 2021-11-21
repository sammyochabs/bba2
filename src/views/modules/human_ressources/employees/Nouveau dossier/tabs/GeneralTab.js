import React from "react";
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
} from "@coreui/react";
import SettingPageTitle from "src/reusable/SettingPageTitle";

const GeneralTab = ({ handleInput }) => {
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
                <CSelect
                  custom
                  name="general_employee_blood"
                  id="select"
                  onChange={handleInput}
                >
                  <option>Please select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Religion</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  name="general_employee_religion"
                  id="select"
                  onChange={handleInput}
                >
                  <option>Please select religion</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Others">Others</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Gender</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  name="general_employee_gender"
                  id="select"
                  onChange={handleInput}
                >
                  <option>Please select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </CSelect>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Select option</CLabel>
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="select">Freedom Fighter</CLabel>
                <CInput
                  type="checkbox"
                  className="col-md-1"
                  name="general_employee_freedom_fighter"
                  onChange={handleInput}
                  value="1"
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
                  onChange={handleInput}
                  value="1"
                />
              </CCol>
              <CCol md="3">
                <CLabel htmlFor="select">Tribal</CLabel>
                <CInput
                  type="checkbox"
                  className="col-md-1"
                  name="general_employee_tribal"
                  onChange={handleInput}
                  value="1"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Nationality </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  name="general_employee_nationality"
                  id="select"
                  onChange={handleInput}
                >
                  <option>Please select nationality</option>
                  <option value="Bangladeshi">Bangladeshi</option>
                  <option value="Others">Others</option>
                </CSelect>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CTabPane>
  );
};
export default GeneralTab;
