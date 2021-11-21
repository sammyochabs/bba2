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

const JobTab = ({ handleInput }) => {
  const { designations } = useSelector((state) => state.designations);
  const { departments } = useSelector((state) => state.departments);

  const renderDesignations = designations.map((des) => {
    return (
      <option defaultValue value={des.DESIGNATION_ID} key={des.DESIGNATION_ID}>
        {des.DESIGNATION}
      </option>
    );
  });
  const renderDepartments = departments.map((dep) => {
    return (
      <option defaultValue value={dep.DEPARTEMENT_ID} key={dep.DEPARTEMENT_ID}>
        {dep.DEPARTEMENT}
      </option>
    );
  });
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
                <CSelect
                  custom
                  name="job_designation"
                  id="select"
                  onChange={handleInput}
                >
                  <option>Please select option</option>
                  {renderDesignations}
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Department</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  name="job_department"
                  id="select"
                  onChange={handleInput}
                >
                  <option>Please select option</option>
                  {renderDepartments}
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">Cadre</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="number"
                  id="hf-email"
                  name="job_cadre"
                  placeholder="Cadre"
                  autoComplete="email"
                />
                <CFormText className="help-block"></CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">Email Adress</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="email"
                  id="hf-email"
                  name="job_email"
                  placeholder="Enter Email..."
                  autoComplete="email"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="phone-input">Phone</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="number"
                  id="text-input"
                  name="job_phone"
                  placeholder="Phone"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Joining Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="date"
                  id="date-input"
                  name="job_joining_date"
                  placeholder="date"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">LRP Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="date"
                  id="date-input"
                  name="job_lrp_date"
                  placeholder="date"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Date of Confirmation</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="date"
                  id="date-input"
                  name="job_confirmation_date"
                  placeholder="date"
                />
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CTabPane>
  );
};

export default JobTab;
